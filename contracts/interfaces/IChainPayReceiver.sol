// SPDX-License-Identifier: GNU GPLv3
pragma solidity ^0.8.0;

interface IChainPayReceiver {
    function paid(address from, bytes memory data) external;
}