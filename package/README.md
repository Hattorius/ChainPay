# ChainPay

[DOCS](https://hattorius.github.io/ChainPay) - [SITE](https://chainpay.dev/) - [DISCORD](https://discord.gg/2MqVeKMPpr)

ChainPay is an open-source payment protocol designed to simplify payments across multiple cryptocurrencies. Currently only built on Binance Smart Chain, ChainPay allows users to receive payments in their preferred token, regardless of what token the sender holds, with automatic conversions via PancakeSwap. ChainPay is designed to scale to other EVM-compatible chains and support complex payment flows in the future.

## Key Features

- Accept payments in any supported token, with automatic swaps into the recipient's preferred token.
- Integrated with PancakeSwap to handle token swaps seamlessly.
- ChainPay is open-source and includes detailed documentation, making integration easy for developers.
- Designed for multi-chain support, including EVM-compatible chains like Ethereum, Polygon, and Avalanche. (Hopefully soon)

## SDK and Developer Tools

ChainPay provides a robust SDK for both **JavaScript** and **Solidity** developers. You can integrate the ChainPay protocol into your projects using our NPM package for JavaScript, or utilize Solidity to handle payments and receive on-chain callbacks when payments are received by your contract.

Detailed guides and code examples are available in the [ChainPay Documentation](https://hattorius.github.io/ChainPay), including step-by-step instructions for creating payments.

## Project Structure

- **contracts**: Contains the interfaces and contract(s) of the ChainPay protocol.
- **docs**: Documentation hosted at https://hattorius.github.io/ChainPay.
- **package**: NPM package for integrating ChainPay into JavaScript projects.
- **site**: Svelte-based index page with an example payment request implementation.

## Roadmap

ChainPay is currently in active development, with several planned improvements:

- Smart contract-initiated payments.
- Expanded (all) token support.
- Multi-hop swaps for efficient conversions.
- Deployment to additional EVM chains.
- Gas fee optimization and analytics for developers.
- Cross-chain payments.
- Payment batching to lower transaction costs.
- Governance mechanism for community feature requests.

## Get Started

For detailed documentation and integration guides, visit [our documentation site](https://hattorius.github.io/ChainPay).

ChainPay is fully open-source—feel free to contribute or explore our codebase.
