---
sidebar_position: 2
---

# Examples

In this section, we'll demonstrate the technologies we use for our
[home page](https://chainpay.dev/) and the payment request form.

## Creating a transaction

Creating a transaction is the first step to receiving tokens through ChainPay.
You define the token you want to receive, the amount, and the recipient to whom
the tokens should be forwarded. Note that payments can only be processed if the
`recipient` is either the signer or a smart contract registered with ChainPay,
where the signer is also registered as the contract's signer.

### [Viem.sh](https://viem.sh/)

To create a payment request using Viem, you just need to specify which tokens
you want to receive and pass the relevant information to the Viem
[`WalletClient`](https://viem.sh/docs/clients/wallet). Typically, creating a
payment request with Viem is done on the client side by users looking to
initiate a transaction.

```ts
import chainpay, { type TransactionType } from 'chainpay';

const transaction: TransactionType = await chainpay.createTransaction({
  walletClient, // user's wallet client
  account: walletAccount, // user's wallet address
  token: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  amount: BigInt('10000000000000000000'), // $10 equivalent
  data_string: Date.now().toString(), // custom data, like user ID or another identifier
  type: 'viem',
});

// Share transaction.encoded, which contains all the data for the transaction as a string
```

### [Ethers.js](https://ethers.org/)

Creating a payment request using Ethers.js is typically done on the server side,
when the developer wants to initiate a payment.

```ts
import chainpay, { type TransactionType } from 'chainpay';
import { Wallet } from 'ethers';

// Import your private key
const wallet = new Wallet('0x...');

const transaction: TransactionType = await chainpay.createTransaction({
  signer: wallet,
  recipient: undefined, // optional, defaults to `wallet.address` if not specified
  token: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  amount: BigInt('10000000000000000000'), // $10 equivalent
  data_string: Date.now().toString(), // custom data, like user ID or another identifier
  type: 'ethers',
});

// Share transaction.encoded, which contains all the data for the transaction as a string
```

### Do it yourself

If you'd prefer to handle things manually, whether you're using a different
library or simply because you're a coding wizard, here's an example:

```ts
import chainpay from 'chainpay';

const { data, messageHash } = chainpay.createTransactionRaw({
  recipient: '0x7982985F05a9dabD3F26dC81CB161f440BE48eE5', // my wallet address (hehe)
  token: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
  amount: BigInt('10000000000000000000'), // $10 equivalent
  data_string: '', // either `data_string` or `data_raw` must be set
});
```

Once this is done, you can review the `data` (which will be your input converted
to hex), and the sign `messageHash`.

## Displaying a transaction

### Our widget (redirect)

One of the simplest ways to allow your users to make a payment is by redirecting
them to our page. The `TransactionType` object, returned when creating a
transaction, includes a `pay` key. This `pay` key contains a URL where the user
can be redirected to complete the payment.

```ts
import chainpay, { type TransactionType } from 'chainpay';

// Retrieve the transaction object, for example:
const transaction: TransactionType =
  chainpay.utils.decodeTransaction(encodedTransaction);

window.open(transaction.pay, '_blank');
```

### Our widget (iframe)

Alternatively, you can display our payment widget directly within your webpage
using an iframe. The ChainPay library provides built-in support for this, and
it’s very easy to implement.

```html
<iframe id="pay_me"></iframe>
```

```ts
import chainpay, { type TransactionType } from 'chainpay';

// Retrieve the transaction object, for example:
let transaction: TransactionType =
  chainpay.utils.decodeTransaction(encodedTransaction);

await transaction.widget('#pay_me');
// "Paid" message received from iframe!
```

In this example, the widget is embedded into the iframe you created. The widget
will notify your webpage once the payment is completed. That's why the code uses
`await`—it waits until the payment is processed before continuing with any
subsequent logic.

### Do it yourself

So, you're feeling adventurous and want to take control of things yourself
again, huh? Well, we can't hold your hand through this part, but there's one
thing you really need to watch out for:

```ts
import chainpay from 'chainpay';

let transaction: TransactionType;
let userSelectedToken = '0x...'; // The token your user wants to use for payment

const pool = const chainpay.utils.findPool(transaction.token, userSelectedToken);
```

It's crucial to ensure that the token your user has selected is supported by
ChainPay. [Currently, ChainPay is still in its early stages](./../future), and
not all token pools are supported. Running the `findPool` function provides
important information. If the result is `undefined`, the token combination is
not supported by ChainPay at this time. Otherwise, it returns an object
containing the `feeTier`, which will be essential for the next steps.

## Paying a transaction

Currently, this process is only available in "do it yourself" format. If you
prefer a more straightforward approach, consider using the widgets described
above. The `pay` function provides all the necessary data to send a transaction.
Below is an example of how to use it.

```ts
import chainpay, { type TransactionType } from 'chainpay';

// Retrieve the transaction object, for example:
let transaction: TransactionType =
  chainpay.utils.decodeTransaction(encodedTransaction);

const data: PaymentData<typeof chainpay.abi> = await chainpay.pay({
  transaction, //  You can directly input the TransactionType object or the encoded transaction
  token: '0x...', // The token you or your user wants to use for payment
  amount: BigInt('98457367349'), // The amount to be paid
  feeTier: undefined, // Optional: if not set, the library will automatically run `utils.findPool`
  chainpayContract: chainpay.constants.CHAINPAY_CONTRACT_ADDRESS,
  type: 'raw', // Currently, only 'raw' type is supported
});

if (data.approve) {
  // Approve token spending for the `CHAINPAY_CONTRACT_ADDRESS` with the specified token and amount
}

// Example with viem.sh:
const payResult = await publicClient.simulateContract({
  address: data.chainpayContract,
  abi: data.abi,
  functionName: data.functionName,
  account: walletAccount, // Retrieve this from viem
  args: data.args,
  value: data.value as any,
  chain: bsc, // Import this from 'viem/chains'
});
```

The `data` variable will now contain all the data you need to pay the
transaction yourself. Please check the API docs for further information on what
it returns and how to use it.

You may have noticed that you need to specify the `amount` even if the user is
paying with a different token. This means you will need to calculate how much of
tokenB the user needs to send in order for you to receive the correct amount of
tokenA. Be sure to include some slippage to prevent the transaction from failing
unexpectedly. Don’t worry—any excess tokens sent by the user will be
automatically refunded by the ChainPay contract.

## Verifying a transaction payment

It is always recommended to verify whether the transaction has been fully paid,
even if the [iframe widget](#our-widget-iframe) indicates that payment was
successful. Since this confirmation happens on the client side, it could be
tampered with. To ensure security, verify the payment on your server using the
original signature.

```ts
import chainpay from 'chainpay';

const paid: boolean = chainpay.isPaid(
  chainpay.constants.CHAINPAY_CONTRACT_ADDRESS,
  signature
);
```

- The signature can either be saved on your end when the transaction is created
  or extracted from the `transaction.signature` field.
- If you extract the signature from the transaction, ensure that the signature
  is indeed yours and that the transaction data is accurate before proceeding
  with the verification.
