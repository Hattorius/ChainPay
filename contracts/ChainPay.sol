// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

// Interfaces
import "./3rdparty/IERC20.sol";
import "./3rdparty/Ownable.sol";
import "./3rdparty/ISwapRouter.sol";
import "./3rdparty/IWrapped.sol";
import "./3rdparty/TransferHelper.sol";
import "./3rdparty/ECDSA.sol";
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
    
    ISwapRouter public immutable swapRouter; // 0x13f4EA83D0bd40E75C8222255bc855a974568Dd4
    IWrapped public immutable wrappedCoin; // 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c

    mapping(bytes => bool) public isPaid;
    mapping(address => bool) public isContract;
    mapping(address => address) public signer;
    bool public isPaused = false;


    constructor(ISwapRouter _swapRouter, IWrapped _wrappedCoin) Ownable() {
        swapRouter = _swapRouter;
        wrappedCoin = _wrappedCoin;
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


    function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMax, uint24 fee) internal returns (uint256 amountInUsed) {
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            recipient: address(this),
            deadline: block.timestamp,
            amountOut: amountOutMax,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0
        });

        amountInUsed = swapRouter.exactOutputSingle(params);

        if (amountInUsed < amountIn) {
            uint256 left = amountIn - amountInUsed;

            if (tokenIn == address(wrappedCoin)) {
                wrappedCoin.withdraw(left);
                bool sent = payable(msg.sender).send(left);
                require(sent, "Failed sending coins");
            } else {
                TransferHelper.safeTransfer(tokenIn, msg.sender, amountIn - amountInUsed);
            }
        }
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
        require(verifySignature(recipient, address(wrappedCoin), msg.value, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        paid(msg.sender, recipient, address(wrappedCoin), msg.value, signature, data);

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
        paid(msg.sender, recipient, expectedToken, expectedTokenAmount, signature, data);
        swap(payingToken, expectedToken, payingTokenAmount, expectedTokenAmount, fee) - payingTokenAmount;

        // Send tokens to recipient, and if any left send those back to the payer
        if (expectedToken != address(wrappedCoin)) {
            bool success = IERC20(expectedToken).transfer(recipient, expectedTokenAmount);
            require(success, "Failed sending tokens");
        } else {
            wrappedCoin.withdraw(expectedTokenAmount);
            bool sent = payable(recipient).send(expectedTokenAmount);
            require(sent, "Failed sending coins");
        }
    }

    // invoice in token, pays in BNB
    function pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) public payable notPaused {
        require(verifySignature(recipient, token, amount, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        wrappedCoin.deposit{ value: msg.value }();
        paid(msg.sender, recipient, token, amount, signature, data);
        swap(address(wrappedCoin), token, msg.value, amount, fee) - msg.value;

        bool success = IERC20(token).transfer(recipient, amount);
        require(success, "Failed sending tokens");
    }

    receive() external payable notPaused { 
        require(msg.sender == address(wrappedCoin));
    }
}
