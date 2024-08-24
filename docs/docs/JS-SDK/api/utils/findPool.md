---
sidebar_position: 2
---

# findPool

This function checks if a combination of two tokens is supported for payment and
returns the applicable pool fee if available.

[View an example here](./../../example#do-it-yourself-1).

## Parameters

| Name   | Type     | Description                      |
| ------ | -------- | -------------------------------- |
| token0 | `string` | The address of the first token.  |
| token1 | `string` | The address of the second token. |

## Return value

The function returns `undefined` if the token pair is not supported. Otherwise,
it returns an object with the pool address and the pool fee.

## Return object

```ts
{
    id: '0x...', // Pool address
    feeTier: number // Pool fee
}
```
