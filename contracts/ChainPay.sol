// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

// Interfaces
import "./IERC20.sol";
import "./Ownable.sol";
import "./ISwapRouter.sol";
import "./IWrapped.sol";
import "./TransferHelper.sol";
import "./ECDSA.sol";
import "./interfaces/IChainPay.sol";
import "./interfaces/IChainPayReceiver.sol";


contract ChainPay is Ownable, IChainPay {
    using ECDSA for bytes32;

    event PaymentDone(
        address indexed recipient,
        address indexed sender,
        bytes indexed signature,
        bytes data,
        address token,
        uint256 amount
    );
    
    ISwapRouter public immutable swapRouter;
    IWrapped public immutable wrappedCoin;
    address public constant PANCAKESWAP_V3_ROUTER_ADDRESS = 0x1b81D678ffb9C0263b24A97847620C99d213eB14; // BNB chain
    address public constant WRAPPED_COIN = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // BNB chain, wrapped BNB

    mapping(bytes => bool) public isPaid;
    mapping(address => bool) public isContract;
    mapping(address => address) public signer;
    bool public isPaused = false;


    constructor() Ownable() {
        swapRouter = ISwapRouter(PANCAKESWAP_V3_ROUTER_ADDRESS);
        wrappedCoin = IWrapped(WRAPPED_COIN);
    }

    modifier notPaused() {
        require(!isPaused, "This contract is paused");
        _;
    }


    function paid(address payer, address recipient, address token, uint256 amount, bytes memory signature, bytes memory data) private {
        emit PaymentDone(recipient, msg.sender, signature, data, token, amount);
        isPaid[signature] = true;

        if (isContract[recipient]) { // I didn't test this and just kind of hope it works right off the bat
            IChainPayReceiver(recipient).paid(payer, data);
        }
    }


    function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMax, uint24 fee) internal returns (uint256) {
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee, // 3000 = 0.3%
            recipient: address(this),
            deadline: block.timestamp,
            amountOut: amountOutMax,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0
        });

        return swapRouter.exactOutputSingle(params);
    }

    function getMessageHash(address recipient, address token, uint256 amount, bytes memory data) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(recipient, token, amount, data));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function verifySignature(address recipient, address token, uint256 amount, bytes memory data, bytes memory signature) internal view returns (bool) {
        bytes32 messageHash = getMessageHash(recipient, token, amount, data);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        address recoveredSigner = ethSignedMessageHash.recover(signature);

        if (!isContract[recipient]) {
            return recoveredSigner == recipient;
        }

        return signer[recipient] != address(0) && recoveredSigner == signer[recipient];
    }


    function pause() public onlyOwner {
        isPaused = true;
    }

    function contractToggle() public {
        isContract[msg.sender] = !isContract[msg.sender];
    }

    function setSigner(address s) public {
        require(isContract[msg.sender], "Not set as a contract!");
        signer[msg.sender] = s;
    }

    // invoice in BNB, pays in BNB
    function pay(address recipient, bytes memory signature, bytes memory data) public payable notPaused {
        require(verifySignature(recipient, WRAPPED_COIN, msg.value, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        paid(msg.sender, recipient, WRAPPED_COIN, msg.value, signature, data);

        bool sent = payable(recipient).send(msg.value);
        require(sent, "Failed sending coins");
    }

    // invoice in token, pays in same token
    function pay(address recipient, address token, uint256 amount, bytes memory signature, bytes memory data) public notPaused {
        require(verifySignature(recipient, token, amount, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        paid(msg.sender, recipient, token, amount, signature, data);

        bool success = IERC20(token).transferFrom(msg.sender, recipient, amount);
        require(success, "Failed sending tokens");
    }

    // invoice in token or BNB, pays in other token
    function pay(address recipient, address expectedToken, uint256 expectedTokenAmount, address payingToken, uint256 payingTokenAmount, uint24 fee, bytes memory signature, bytes memory data) public notPaused {
        require(verifySignature(recipient, expectedToken, expectedTokenAmount, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        // Exchange tokens for wanted tokens
        TransferHelper.safeTransferFrom(payingToken, msg.sender, address(this), payingTokenAmount);
        uint256 left = swap(payingToken, expectedToken, payingTokenAmount, expectedTokenAmount, fee) - payingTokenAmount;

        paid(msg.sender, recipient, expectedToken, expectedTokenAmount, signature, data);

        // Send tokens to recipient, and if any left send those back to the payer
        if (expectedToken != WRAPPED_COIN) {
            bool success = IERC20(expectedToken).transfer(recipient, expectedTokenAmount);
            require(success, "Failed sending tokens");
        } else {
            wrappedCoin.withdraw(expectedTokenAmount);
            bool sent = payable(recipient).send(expectedTokenAmount);
            require(sent, "Failed sending coins");
        }

        if (left > 0) {
            bool successPayback = IERC20(payingToken).transfer(msg.sender, left);
            require(successPayback, "Failed sending tokens");
        }
    }

    // invoice in token, pays in BNB
    function pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) public payable notPaused {
        require(verifySignature(recipient, token, amount, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        wrappedCoin.deposit{ value: msg.value }();
        uint256 left = swap(WRAPPED_COIN, token, msg.value, amount, fee) - msg.value;

        paid(msg.sender, recipient, token, amount, signature, data);

        bool success = IERC20(token).transfer(recipient, amount);
        require(success, "Failed sending tokens");

        if (left > 0) {
            wrappedCoin.withdraw(left);
            bool sent = payable(recipient).send(left);
            require(sent, "Failed sending coins");
        }
    }

    receive() external payable notPaused { 
        require(msg.sender == WRAPPED_COIN);
    }
}
