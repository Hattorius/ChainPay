---
sidebar_position: 1
---

# decodeTransaction

The `decodeTransaction` function generates a `TransactionType` from an encoded
transaction.

[View an example here](./../../example#our-widget-redirect).

## Parameters

| Name  | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| input | `string` | The encoded transaction data. |

## Return value

The function returns a transaction object that includes all the details of the
decoded transaction. This object can then be used for processing, verifying, or
displaying the transaction.

## Return type

`TransactionType`

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
