---
sidebar_position: 1
---

# IChainPayReceiver.sol

The
[`IChainPayReceiver`](https://github.com/Hattorius/ChainPay/blob/main/contracts/interfaces/IChainPayReceiver.sol)
interface enables your smart contract to receive payments from the ChainPay
contract.

```solidity
interface IChainPayReceiver {
    function paid(address from, bytes memory data) external;
}
```

## `paid()`

The paid function is called by the ChainPay smart contract once a payment has
been successfully processed.

### Parameters

| Name | Type      | Description                                                                                                                                                                                                                                                                                      |
| ---- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from | `address` | The address of the sender who made the payment                                                                                                                                                                                                                                                   |
| data | `bytes`   | The data passed along when creating the ChainPay transaction. This is why the `data_raw` option exists in the [`CreateTransactionInput`](./../JS-SDK/api/types#createtransactioninput), which accepts a `Uint8Array`. This allows for extra parameters or data to be included for your callback. |

## Example Implementation

Below is an example of an ERC20 token contract that allows users to mint tokens
through a ChainPay payment.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IChainPayReceiver.sol";
import "./IChainPay.sol";

contract MyToken is ERC20, IChainPayReceiver {
    address private immutable chainPay;

    constructor(string memory name, string memory symbol, address _chainPay) ERC20(name, symbol) {
        // Register the contract with ChainPay and set the signer
        IChainPay(_chainPay).contractToggle();
        IChainPay(_chainPay).setSigner(msg.sender);

        chainPay = _chainPay;
    }

    function paid(address from, bytes memory data) public override {
        require(msg.sender == chainPay, "Unauthorized sender");
        _mint(from, 10 ** decimals()); // Mint 10 tokens to the payer
    }
}
```
