---
sidebar_position: 3
---

# pay

The `pay` function provides all the data necessary to send a transaction to the
ChainPay smart contract, enabling payment of the specified amount.

[View an example here](./../example#paying-a-transaction).

## Parameters

| Name  | Type       | Description                                                                        |
| ----- | ---------- | ---------------------------------------------------------------------------------- |
| input | `PayInput` | An object containing details such as the transaction, token for payment, and more. |

## Return value

This function returns the data required to send a transaction to the blockchain
to complete a ChainPay transaction. It also indicates if the user must approve
any ERC20 token transfers before the payment can be processed.

## Return type

`PaymentData<abi>`

### Example object

```ts
{
    args: (string | bigint)[], // Arguments for the transaction in hexadecimal or bigint format
    value?: bigint, // Optional value if the transaction requires payment in native tokens
    approve?: { // Approval details if an ERC20 token needs to be approved for the ChainPay contract
        token: '0x...', // ERC20 token address
        amount: bigint // Amount of tokens to approve
    },
    chainpayContract: '0x...', // ChainPay contract address
    abi: [], // ChainPay ABI
    functionName: string // Function name to call on the smart contract
}
```
