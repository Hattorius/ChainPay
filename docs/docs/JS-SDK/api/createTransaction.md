---
sidebar_position: 1
---

# createTransaction

The `createTransaction` function is the starting point for initiating a payment
request or transaction within ChainPay. This function allows you to specify the
token, amount, and recipient, and it returns a
[`TransactionType`](./types#transactiontype) object containing all the necessary
information to process the transaction

[View examples here](./../example#creating-a-transaction) for detailed usage
scenarios.

## Parameters

| Name  | Type                                                       | Description                                                            |
| ----- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| input | [`CreateTransactionInput`](./types#createtransactioninput) | An object containing details such as the token, amount, and recipient. |

## Return value

The function returns a transaction object that contains all the details of the
created transaction. This object can be used in subsequent steps to process,
verify, or display the transaction.

## Return type

[`TransactionType`](./types#transactiontype)

### Example object

```ts
{
    data: '0x...', // Hexadecimal data for the transaction
    token: '0x...',
    amount: bigint,
    recipient: '0x...',
    signature: '0x...',
    encoded: string,
    pay?: string, // URL for payment redirection
    widgetUrl?: string, // URL to embed the transaction in an iframe
    widget?: (el: string | HTMLIFrameElement) => Promise<TransactionType> // Resolves when payment is complete
}
```
