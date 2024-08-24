---
sidebar_position: 2
---

# createTransactionRaw

The `createTransactionRaw` function is designed for advanced users who want more
control over the transaction process or for those using a library that isn’t
natively supported by ChainPay.

[View an example here](./../example#do-it-yourself).

## Parameters

| Name  | Type | Description                                                            |
| ----- | ---- | ---------------------------------------------------------------------- |
| input |      | An object containing details such as the token, amount, and recipient. |

```ts
{
    recipient: string, // The address of the recipient
    token: string, // The token that will be received
    amount: bigint, // The amount to be received
    data_string?: string, // Optional additional data. Use an empty string (`''`) if not needed
    data_raw?: Uint8Array // Optional raw data, typically used for on-chain smart contract callbacks
}
```

<!-- prettier-ignore -->
:::note
Either `data_string` or `data_raw` must be set.
:::

## Return value

This function returns an object that includes the transaction data encoded as a
`0x...` string, which can be passed into the `pay` function of the smart
contract. It also provides a `messageHash` that must be signed by the recipient.

## Return object

```ts
{
    data: '0x...', // Hex-encoded data for the transaction
    messageHash: '0x...' // The hash of the message to be signed by the recipient
}
```
