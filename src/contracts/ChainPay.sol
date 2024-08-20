// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

// Interfaces
import "./IERC20.sol";
import "./Ownable.sol";
import "./ISwapRouter.sol";
import "./IWrapped.sol";
import "./TransferHelper.sol";


contract ChainPay is Ownable {
    ISwapRouter public immutable swapRouter;
    IWrapped public immutable wrappedCoin;
    address public constant SUSHISWAP_V3_ROUTER_ADDRESS = 0x909662a99605382dB1E8d69cc1f182bb577d9038; // BNB chain
    address public constant WRAPPED_COIN = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // BNB chain, wrapped BNB

    constructor() {
        swapRouter = ISwapRouter(SUSHISWAP_V3_ROUTER_ADDRESS);
        wrappedCoin = IWrapped(WRAPPED_COIN);
    }

    function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMax, uint24 fee) internal {
        TransferHelper.safeApprove(IERC20(tokenIn), address(swapRouter), tokenIn);
        
        IERC20(tokenIn).approve(address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee, // 3000 = 0.3%
            recipient: address(this),
            deadline: block.timestamp + 15,
            amountIn: amountIn,
            amountOutMinimum: amountOutMinimum,
            sqrtPriceLimitX96: 0
        });

        uniswapRouter.swapExactTokensForTokens(
            tokenOutBalance,
            amountOut,
            path,
            address(this),
            block.timestamp + 15
        );
    }


}
