---
sidebar_position: 9
---

# types

Below is a list of types used and exported by the ChainPay SDK.

## `CreateTransactionInput`

The input type for creating a transaction through the SDK. This type is
structured differently depending on whether you're using
[ethers.js](https://ethers.org/) or [viem](https://viem.sh/).

```ts
{
    signer: Wallet;
    recipient?: string;
    token: string;
    amount: number | bigint;
    data_string?: string;
    data_raw?: Uint8Array | string;
    type: 'ethers';
} | {
    walletClient: {
        signMessage: (args: {
            message: SignableMessage;
            account: `0x${string}`;
        }) => Promise<SignMessageReturnType>;
    };
    account: `0x${string}`;
    recipient?: string;
    token: string;
    amount: number | bigint;
    data_string?: string;
    data_raw?: Uint8Array | string;
    type: 'viem';
}
```

## `TransactionType`

Represents a transaction that may or may not require payment.

```ts
{
    data: string;
    token: string;
    amount: number | bigint;
    recipient: string;
    signature: string;
    encoded: string;
    pay?: string;
    widgetUrl?: string;
    widget?: (el: string | HTMLIFrameElement) => Promise<TransactionType>;
}
```

## `PayInput`

The input needed to create [`PaymentData`](#paymentdata), used to initiate a
payment transaction using ChainPay.

```ts
{
    transaction: string | TransactionType;
    token: `0x${string}`; // token user wants to pay with
    amount: bigint; // amount user wants to pay with
    feeTier?: number;
    chainpayContract: `0x${string}`;
    type: 'raw';
}
```

## `PaymentData`

Contains all the necessary data for creating a transaction on the blockchain.

```ts
{
    value?: bigint;
    args:
        | [string, string, string]
        | [string, string, bigint, string, string]
        | [string, string, bigint, number, string, string]
        | [string, string, bigint, string, bigint, number, string, string];
    chainpayContract: `0x${string}`;
    abi: T;
    functionName: string;
    approve?: {
        token: `0x${string}`;
        amount: bigint;
    };
}
```
