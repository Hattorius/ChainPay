// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

// Interfaces
import "./IERC20.sol";
import "./Ownable.sol";
import "./IUniswapV2Router02.sol";
import "./IWrapped.sol";


contract ChainPay is Ownable {
    IUniswapV2Router02 public immutable uniswapRouter;
    IWrapped public immutable wrappedCoin;
    address public constant UNISWAP_V2_ROUTER = 0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24; // BNB chain
    address public constant WRAPPED_COIN = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // BNB chain, wrapped BNB

    constructor() {
        uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
        wrappedCoin = IWrapped(WRAPPED_COIN);
    }

    function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut) internal {
        uint256 tokenOutBalance = IERC20(tokenOut).balanceOf(address(this));
        require(tokenOutBalance >= amountIn, "Insufficient token balance");

        IERC20(tokenOut).approve(address(UNISWAP_V2_ROUTER), tokenOutBalance);

        address[] memory path;
        path[0] = tokenIn;
        path[1] = tokenOut;

        uniswapRouter.swapExactTokensForTokens(
            tokenOutBalance,
            amountOut,
            path,
            address(this),
            block.timestamp + 15
        );
    }

    
}
