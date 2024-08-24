---
sidebar_position: 6
---

# erc20Abi

The `erc20Abi` is a constant that contains the ABI for the standard ERC-20 token
contract. This ABI defines the functions, events, and data structures used to
interact with any ERC-20 compliant token on the blockchain.

## Usage

This ABI is essential for programmatically interacting with ERC-20 tokens. It
allows you to perform common token operations, such as:

- Transferring tokens
- Checking token balances
- **Approving token allowances for smart contracts**

In most cases, our primary use involves approving tokens for spending by the
ChainPay contract.
