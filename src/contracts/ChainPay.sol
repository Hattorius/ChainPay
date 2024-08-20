// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

// Interfaces
import "./IERC20.sol";
import "./Ownable.sol";
import "./ISwapRouter.sol";
import "./IWrapped.sol";
import "./TransferHelper.sol";


abstract contract ChainPay is Ownable {
    ISwapRouter public immutable swapRouter;
    IWrapped public immutable wrappedCoin;
    address public constant PANCAKESWAP_V3_ROUTER_ADDRESS = 0x1b81D678ffb9C0263b24A97847620C99d213eB14; // BNB chain
    address public constant WRAPPED_COIN = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // BNB chain, wrapped BNB

    constructor() {
        swapRouter = ISwapRouter(PANCAKESWAP_V3_ROUTER_ADDRESS);
        wrappedCoin = IWrapped(WRAPPED_COIN);
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
}
