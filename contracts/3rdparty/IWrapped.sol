// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

interface IWrapped {
    function deposit() external payable;
    function withdraw(uint256 wad) external;
}