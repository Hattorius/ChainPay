// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

// Interfaces
import "./IERC20.sol";
import "./Ownable.sol";
import "./ISwapRouter.sol";
import "./IWrapped.sol";
import "./TransferHelper.sol";
import "./ECDSA.sol";


contract ChainPay is Ownable {
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


    constructor() Ownable() {
        swapRouter = ISwapRouter(PANCAKESWAP_V3_ROUTER_ADDRESS);
        wrappedCoin = IWrapped(WRAPPED_COIN);
    }


    function paid(bytes memory signature) private {
        isPaid[signature] = true;
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

    function verifySignature(address recipient, address token, uint256 amount, bytes memory data, bytes memory signature) internal pure returns (bool) {
        bytes32 messageHash = getMessageHash(recipient, token, amount, data);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        address recoveredSigner = ethSignedMessageHash.recover(signature);
        return recoveredSigner == recipient;
    }


    function pay(address recipient, bytes memory signature, bytes memory data) public payable {
        require(verifySignature(recipient, WRAPPED_COIN, msg.value, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        bool sent = payable(recipient).send(msg.value);
        require(sent, "Failed sending coins");

        emit PaymentDone(recipient, msg.sender, signature, data, WRAPPED_COIN, msg.value);
        paid(signature);
    }

    function pay(address recipient, address token, uint256 amount, bytes memory signature, bytes memory data) public {
        require(verifySignature(recipient, token, amount, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        bool success = IERC20(token).transferFrom(msg.sender, recipient, amount);
        require(success, "Failed sending tokens");
        
        emit PaymentDone(recipient, msg.sender, signature, data, token, amount);
        paid(signature);
    }

    function pay(address recipient, address expectedToken, uint256 expectedTokenAmount, address payingToken, uint256 payingTokenAmount, uint24 fee, bytes memory signature, bytes memory data) public {
        require(verifySignature(recipient, expectedToken, expectedTokenAmount, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        // Exchange tokens for wanted tokens
        TransferHelper.safeTransferFrom(payingToken, msg.sender, address(this), payingTokenAmount);
        uint256 left = swap(payingToken, expectedToken, payingTokenAmount, expectedTokenAmount, fee) - payingTokenAmount;

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

        emit PaymentDone(recipient, msg.sender, signature, data, expectedToken, expectedTokenAmount);
        paid(signature);
    }

    function pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) public payable {
        require(verifySignature(recipient, token, amount, data, signature), "Payment invalid");
        require(!isPaid[signature], "This has already been paid");

        wrappedCoin.deposit{ value: msg.value }();
        uint256 left = swap(WRAPPED_COIN, token, msg.value, amount, fee) - msg.value;

        bool success = IERC20(token).transfer(recipient, amount);
        require(success, "Failed sending tokens");

        if (left > 0) {
            wrappedCoin.withdraw(left);
            bool sent = payable(recipient).send(left);
            require(sent, "Failed sending coins");
        }

        emit PaymentDone(recipient, msg.sender, signature, data, token, amount);
        paid(signature);
    }
}
