// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

interface IChainPay {
    function pay(address recipient, bytes memory signature, bytes memory data) external payable;
    function pay(address recipient, address token, uint256 amount, bytes memory signature, bytes memory data) external;
    function pay(address recipient, address expectedToken, uint256 expectedTokenAmount, address payingToken, uint256 payingTokenAmount, uint24 fee, bytes memory signature, bytes memory data) external;
    function pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) external payable;
}
