---
sidebar_position: 1
---

# IChainPay.sol

The
[`IChainPay`](https://github.com/Hattorius/ChainPay/blob/main/contracts/interfaces/IChainPay.sol)
Solidity interface facilitates interactions with the ChainPay smart contract.
This interface defines functions for automating on-chain payments via the
ChainPay contract.

```solidity
interface IChainPay {
    function pay(address recipient, bytes memory signature, bytes memory data) external payable;
    function pay(address recipient, address token, uint256 amount, bytes memory signature, bytes memory data) external;
    function pay(address recipient, address expectedToken, uint256 expectedTokenAmount, address payingToken, uint256 payingTokenAmount, uint24 fee, bytes memory signature, bytes memory data) external;
    function pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) external payable;
    function setSigner(address signer) external;
    function contractToggle() external;
}
```

## Paying in BNB, invoice in BNB

```solidity
function pay(address recipient, bytes memory signature, bytes memory data) external payable;
```

| Name      | Type      | Description                                                                                                                                                                                                      |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| recipient | `address` | The recipient of the payment                                                                                                                                                                                     |
| signature | `bytes`   | A signature validating the transaction. [See examples of how to generate it](./../JS-SDK/example#creating-a-transaction)                                                                                         |
| data      | `bytes`   | Additional data for a possible callback or transaction context. See [`chainpay.createTransaction`](./../JS-SDK/api/createTransaction) or [`chainpay.createTransactionRaw`](./../JS-SDK/api/createTransactionRaw) |

| `msg.value` | The amount of BNB being paid. |
| ----------- | ----------------------------- |

## Paying in Token, invoice in same Token

```solidity
function pay(address recipient, address token, uint256 amount, bytes memory signature, bytes memory data) external;
```

| Name      | Type      | Description                                                                                                                                                                                                      |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| recipient | `address` | The recipient of the payment                                                                                                                                                                                     |
| token     | `address` | The token to be used for payment, and the one expected in the transaction                                                                                                                                        |
| amount    | `uint256` | The amount of the specified token to be paid                                                                                                                                                                     |
| signature | `bytes`   | A signature validating the transaction. [See examples of how to generate it](./../JS-SDK/example#creating-a-transaction)                                                                                         |
| data      | `bytes`   | Additional data for a possible callback or transaction context. See [`chainpay.createTransaction`](./../JS-SDK/api/createTransaction) or [`chainpay.createTransactionRaw`](./../JS-SDK/api/createTransactionRaw) |

## Invoice in Token/BNB, paying in another Token

```solidity
function pay(address recipient, address expectedToken, uint256 expectedTokenAmount, address payingToken, uint256 payingTokenAmount, uint24 fee, bytes memory signature, bytes memory data) external;
```

| Name                | Type      | Description                                                                                                                                                                                                      |
| ------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| recipient           | `address` | The recipient of the payment                                                                                                                                                                                     |
| expectedToken       | `address` | The token expected by the transaction                                                                                                                                                                            |
| expectedTokenAmount | `uint256` | The amount of the expected token                                                                                                                                                                                 |
| payingToken         | `address` | The token being used for the actual payment                                                                                                                                                                      |
| payingTokenAmount   | `uint256` | The amount of the paying token being used. **(Slippage to be added)**                                                                                                                                            |
| fee                 | `uint24`  | Pool fee obtained from [`chainpay.utils.findPool`](./../JS-SDK/api/utils/findPool)                                                                                                                               |
| signature           | `bytes`   | A signature validating the transaction. [See examples of how to generate it](./../JS-SDK/example#creating-a-transaction)                                                                                         |
| data                | `bytes`   | Additional data for a possible callback or transaction context. See [`chainpay.createTransaction`](./../JS-SDK/api/createTransaction) or [`chainpay.createTransactionRaw`](./../JS-SDK/api/createTransactionRaw) |

## Paying in BNB, Invoice in Token

```solidity
function pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) external payable;
```

| Name      | Type      | Description                                                                                                                                                                                                      |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| recipient | `address` | The recipient of the payment                                                                                                                                                                                     |
| token     | `address` | The token the transaction expects                                                                                                                                                                                |
| amount    | `uint256` | The amount of the expected token                                                                                                                                                                                 |
| fee       | `uint24`  | Pool fee obtained from [`chainpay.utils.findPool`](./../JS-SDK/api/utils/findPool)                                                                                                                               |
| signature | `bytes`   | A signature validating the transaction. [See examples of how to generate it](./../JS-SDK/example#creating-a-transaction)                                                                                         |
| data      | `bytes`   | Additional data for a possible callback or transaction context. See [`chainpay.createTransaction`](./../JS-SDK/api/createTransaction) or [`chainpay.createTransactionRaw`](./../JS-SDK/api/createTransactionRaw) |

| `msg.value` | The amount of BNB being paid. |
| ----------- | ----------------------------- |

## `contractToggle()`

This function toggles whether `msg.sender` is a contract. When set to `true`,
the ChainPay smart contract will trigger a callback to your contract that
implements the [`IChainPayReceiver`](./IChainPayReceiver) interface after
successfully sending the tokens.

## `setSigner(address)`

This function should only be called by smart contracts with `contractToggle()`
set to `true`. Since smart contracts cannot sign transactions directly, this
function allows you to designate a signer that can sign on behalf of the smart
contract. This enables smart contracts to receive payments through ChainPay by
having the designated signer authorize transactions.
