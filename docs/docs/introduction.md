---
sidebar_position: 1
---

# ChainPay

ChainPay aims to make sending and receiving payments across all EVM-compatible
blockchains simple and seamless. It eliminates the hassle of checking whether
your customer accepts a specific token or coin and removes the need for multiple
transactions.

Imagine this scenario:

- You want to pay your friend for mowing the lawn last night.
- Your friend prefers BUSD on the Polygon chain.
- You only have ETH on Arbitrum.

What do you do?

ChainPay's goal is to streamline situations like this, making payments as easy
as possible. At the same time, it enables third parties to accept payments from
any blockchain using any token.

## Current State of ChainPay

ChainPay was developed for Binance’s 2024 Q3 hackathon. Despite the hackathon
spanning two weeks, the current version of ChainPay was built in just five days.
As a result, it is in the proof of concept or minimum viable product stage, and
currently supports the Binance Smart Chain with the following features:

- Payment requests in BNB, with the user paying in BNB.
- Payment requests in a specific token, with the user paying in that token.
- Payment requests in BNB or a token, with the user paying in a different token.
- Payment requests in a token, with the user paying in BNB.

Additionally, the project supports on-chain postbacks, allowing you to trigger
on-chain actions with your smart contract after receiving a payment.
