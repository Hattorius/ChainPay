import { c as create_ssr_component, b as createEventDispatcher, d as add_attribute, g as getContext, a as subscribe, v as validate_component, e as escape, n as null_to_empty } from "../../chunks/index3.js";
import { w as walletClient, a as walletAccount, C as Chains, b as activeChain, T as TokenPicker, t as tokens } from "../../chunks/tokens.js";
import "@web3-onboard/injected-wallets";
import "chainpay";
import { parseUnits } from "viem";
const DevelopersButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<button class="hover:bg-gray-900 py-3 px-5 transition border">Developer docs </button>`;
});
const TokenInputAmount = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { decimals } = $$props;
  let value = "";
  createEventDispatcher();
  if ($$props.decimals === void 0 && $$bindings.decimals && decimals !== void 0)
    $$bindings.decimals(decimals);
  return `<input type="text" class="bg-black border w-full h-10 p-2" placeholder="Ex. 5.55"${add_attribute("value", value, 0)}>`;
});
const CONTEXT_KEY = "AUTH_CONTEXT";
function useAuth() {
  const context = getContext(CONTEXT_KEY);
  if (!context)
    throw new Error("AuthProvider isn't valid!");
  return context;
}
const Wallet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $walletClient, $$unsubscribe_walletClient;
  let $$unsubscribe_walletAccount;
  $$unsubscribe_walletClient = subscribe(walletClient, (value) => $walletClient = value);
  $$unsubscribe_walletAccount = subscribe(walletAccount, (value) => value);
  {
    {
      (async () => {
        const chainId = await $walletClient?.getChainId().catch((_) => {
        });
        if (chainId) {
          if (chainId === parseInt(Chains.BSC)) {
            return;
          }
        }
      })();
    }
  }
  $$unsubscribe_walletClient();
  $$unsubscribe_walletAccount();
  return `${``}`;
});
const ConnectButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  useAuth();
  return `<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition">Connect wallet</button>`;
});
const ChangeNetworkButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_activeChain;
  let $$unsubscribe_walletAccount;
  $$unsubscribe_activeChain = subscribe(activeChain, (value) => value);
  $$unsubscribe_walletAccount = subscribe(walletAccount, (value) => value);
  useAuth();
  $$unsubscribe_activeChain();
  $$unsubscribe_walletAccount();
  return `<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition">Switch to Binance chain</button>`;
});
const CreatePaymentRequestButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_walletAccount;
  let $$unsubscribe_walletClient;
  $$unsubscribe_walletAccount = subscribe(walletAccount, (value) => value);
  $$unsubscribe_walletClient = subscribe(walletClient, (value) => value);
  let { token } = $$props;
  let { amount } = $$props;
  if ($$props.token === void 0 && $$bindings.token && token !== void 0)
    $$bindings.token(token);
  if ($$props.amount === void 0 && $$bindings.amount && amount !== void 0)
    $$bindings.amount(amount);
  token ? parseUnits(`${amount}`, parseInt(token.decimals)) : 0;
  $$unsubscribe_walletAccount();
  $$unsubscribe_walletClient();
  return `<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition">Create payment request</button>`;
});
const CreatePaymentRequest = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let decimals;
  let toReceive = null;
  let amount = 0;
  decimals = 0;
  return `<h2 class="text-xl">Create payment request

	<div class="text-base mt-3"><p>Pick a token to receive</p>
		${validate_component(TokenPicker, "TokenPicker").$$render($$result, { tokens: tokens.getAll() }, {}, {})}</div>

	<div class="text-base mt-3"><p>How many tokens?</p>
		${validate_component(TokenInputAmount, "TokenInputAmount").$$render($$result, { decimals }, {}, {})}</div>

	<div class="text-lg">${validate_component(Wallet, "Wallet").$$render($$result, {}, {}, {
    WrongNetwork: () => {
      return `${validate_component(ChangeNetworkButton, "ChangeNetworkButton").$$render($$result, { slot: "WrongNetwork" }, {}, {})}`;
    },
    NotConnected: () => {
      return `${validate_component(ConnectButton, "ConnectButton").$$render($$result, { slot: "NotConnected" }, {}, {})}`;
    },
    default: () => {
      return `${validate_component(CreatePaymentRequestButton, "CreatePaymentRequestButton").$$render($$result, { token: toReceive, amount }, {}, {})}`;
    }
  })}</div></h2>`;
});
const Index_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "button.active.svelte-1108bna{background:#fff;color:#000}",
  map: null
};
const Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="max-w-xl mx-auto px-2 text-center pt-12 pb-9 sm:pt-9 sm:pb-16"><div class="flex justify-center"><h2 class="text-3xl mb-2 border-b pb-1">What is ChainPay?</h2></div>

	<p>ChainPay is an open-source payment solution deployed on Binance Smart Chain that allows users
		and contracts to receive payments in any token of their choice. It automatically swaps the
		sender&#39;s token to the recipient&#39;s preferred token, simplifying multi-token payments.
	</p></div>

<div class="py-9 sm:py-16"><div class="border w-max p-4 mx-auto"><h2 class="text-3xl mb-2 text-center">Key Features</h2>

		<div class="flex flex-col sm:flex-row justify-center gap-5 sm:gap-10 mt-2 max-w-full sm:grid sm:grid-cols-2 xl:flex"><div class="text-center w-64"><h3 class="text-xl">Token Flexibility</h3>
				<p>Send and receive payments in any supported token, regardless of what token the sender
					holds.
				</p></div>

			<div class="border-t w-full block sm:hidden"></div>

			<div class="text-center w-64"><h3 class="text-xl">Automatic Swaps</h3>
				<p>Integrated with PancakeSwap for seamless swaps between tokens during payments.</p></div>

			<div class="border-t w-full block sm:hidden"></div>

			<div class="text-center w-64"><h3 class="text-xl">Developer Friendly</h3>
				<p>Open-source, easy-to-integrate with robust developer documentation.</p></div>

			<div class="border-t w-full block sm:hidden"></div>

			<div class="text-center w-64"><h3 class="text-xl">Future-Ready</h3>
				<p>Currently on BSC, but designed to expand to multiple EVM chains and support complex
					bridges and multi-hop swaps in future releases.
				</p></div></div></div></div>

<div class="pb-9 pt-12 sm:py-18"><h2 class="text-3xl mb-6 text-center">How it works</h2>

	<div class="flex flex-col-reverse sm:flex-row gap-10"><div class="flex-1 flex flex-col justify-center text-left sm:text-right px-2 sm:px-0"><ul class="list-disc list-inside sm:rtl"><li>You create an unsigned transaction</li>
				<li>The recipient of the token / BNB signs the transaction</li>
				<li>A different user pays to the ChainPay contract</li>
				<li>We do our magic in real time &amp; send you your tokens</li></ul>

			<p class="mt-2 sm:text-right">All on chain</p></div>

		<div class="flex-1 px-2 sm:px-0"><img class="w-full max-w-lg" src="/diagram.svg" alt="Diagram showing how ChainPay works"></div></div></div>

<div class="pb-9 pt-12 w-full max-w-4xl mx-auto sm:py-18 px-2"><h2 class="text-3xl mb-6 text-left">Use Cases</h2>

	<div class="flex flex-col md:flex-row"><div class="flex flex-col"><button class="${escape(null_to_empty("active border-y border-l py-2 px-4 transition border-r md:border-r-0"), true) + " svelte-1108bna"}">Freelancers &amp; Consultants</button>
			<button class="${escape(null_to_empty("hover:bg-gray-900 border-b border-l py-2 px-4 transition border-r md:border-r-0"), true) + " svelte-1108bna"}">DAOs &amp; DApps</button>
			<button class="${escape(null_to_empty("hover:bg-gray-900 md:border-b border-l py-2 px-4 transition border-r md:border-r-0"), true) + " svelte-1108bna"}">Merchants &amp; Online Stores</button></div>

		<div class="flex-1 border p-4"><h3 class="text-xl">Problem</h3>
			<p class="mb-2">${`Freelancers and consultants often work with clients worldwide, and payments in crypto
					offer a fast and borderless alternative to traditional banking systems. However, the
					variety of tokens in circulation can make it difficult to manage income when clients pay
					in different tokens. Freelancers may prefer stablecoins or a specific token to avoid price
					volatility or to match their investment portfolios, but they often receive payments in
					whichever token the client holds.`}</p>

			<h3 class="text-xl">ChainPay Solution</h3>
			<p class="mb-2">${`With ChainPay, freelancers can request payments in their preferred token (e.g., USDT,
					BUSD, or any other stablecoin) regardless of what the client holds. Clients are free to
					pay using any token in their wallet, and ChainPay automatically converts it to the token
					chosen by the freelancer via PancakeSwap.`}</p>

			<h3 class="text-xl">Example</h3>
			<p class="mb-2">${`Sarah, a graphic designer, prefers to receive payments in BUSD to avoid market volatility.
					Her client, however, holds their assets in BNB and prefers to pay with it. Using ChainPay,
					Sarah creates a payment request in BUSD. When her client pays in BNB, ChainPay handles the
					conversion automatically, and Sarah receives the equivalent amount in BUSD without needing
					to manually swap tokens on an exchange.`}</p>

			<h3 class="text-xl">Benefits</h3>
			<ul class="list-disc list-inside">${`<li>Eliminates the need for freelancers to manually swap received tokens.</li>
					<li>Protects freelancers from market volatility by allowing payments in stablecoins.</li>
					<li>Increases client flexibility by accepting payments in any token.</li>`}</ul></div></div></div>

<div class="max-w-xl mx-auto px-2 text-center pt-12 pb-9 sm:py-18"><div class="flex justify-center"><h2 class="text-3xl mb-2 pb-1">Developer-Friendly Integration</h2></div>

	<p>ChainPay is built with developers in mind. Easily integrate our contract to handle automatic
		token swaps for payments within your DApp or service. No need to worry about managing liquidity
		or token conversions.
	</p>

	<div class="flex justify-center mt-4">${validate_component(DevelopersButton, "DevelopersButton").$$render($$result, {}, {}, {})}</div></div>

<div class="pb-9 pt-12 w-full max-w-2xl mx-auto sm:py-18"><h2 class="text-3xl mb-6 text-center">Roadmap &amp; Future Plans</h2>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0"><div class="text-center sm:text-right sm:pr-4"><h3 class="text-xl">Version 0.1</h3>
			<small>(current)</small></div>
		<div class="flex-1 sm:border-l pl-4"><ul class="list-disc list-inside"><li>Backend APIs for developers to integrate payment creation functionality</li>
				<li>Payment support for selected tokens using specific PancakeSwap pools</li>
				<li>Accept payments to both wallets and smart contracts</li>
				<li>Basic documentation and examples for developer integration</li>
				<li>Demo widget for testing payment functionality</li></ul></div></div>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0"><div class="text-center sm:text-right sm:pr-4"><h3 class="text-xl">Version 0.2</h3></div>
		<div class="flex-1 sm:border-l pl-4"><ul class="list-disc list-inside"><li>Allow smart contracts to initiate and send payments</li>
				<li>Expand support for additional tokens and liquidity pools</li>
				<li>Support multi-hop swaps for more efficient token conversion</li>
				<li>Implement basic logging and transaction monitoring for payment tracking</li>
				<li>Upgrade developer documentation with code snippets and SDK examples</li></ul></div></div>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0"><div class="text-center sm:text-right sm:pr-4"><h3 class="text-xl">Version 0.3</h3></div>
		<div class="flex-1 sm:border-l pl-4"><ul class="list-disc list-inside"><li>Deploy ChainPay on additional EVM-compatible blockchains (e.g., Ethereum, Polygon,
					Avalanche)
				</li>
				<li>Expand supported tokens and pools across new chains</li>
				<li>Integrate gas fee optimization mechanisms for cost-effective transactions</li>
				<li>Provide detailed transaction analytics for developers (e.g., success rates, swap
					efficiency)
				</li></ul></div></div>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0"><div class="text-center sm:text-right sm:pr-4"><h3 class="text-xl">Version 1.0</h3></div>
		<div class="flex-1 sm:border-l pl-4"><ul class="list-disc list-inside"><li>Introduce cross-chain payment support utilizing bridges for seamless multi-chain
					interactions
				</li>
				<li>Allow payment batching to reduce transaction costs (e.g., aggregate multiple payments into
					a single transaction)
				</li>
				<li>Implement customizable fee structures for projects integrating ChainPay (e.g., revenue
					sharing or flat fees)
				</li>
				<li>Launch a governance mechanism to enable the community to vote on new features and
					supported chains??
				</li>
				<li>Security audit by a third-party provider to ensure contract robustness</li></ul></div></div></div>

<div class="max-w-xl mx-auto px-2 text-center py-12"><div class="flex justify-center"><h2 class="text-3xl pb-1">Join the Community</h2></div>

	<div class="flex justify-center mt-4 gap-10"><a href="https://github.com/Hattorius/ChainPay" target="_blank"><img src="/github.svg" class="h-12" alt="Github link"></a>

		<a href="TODO: CREATE ONE" target="_blank"><img src="/discord.svg" class="h-12" alt="Discord link"></a></div>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.initial-view.svelte-mk0wr{@media only screen and (min-width: 640px) {\r\n			height: 60vh;\r\n		};@media only screen and (min-width: 1921px) {\r\n			height: 40vh;\r\n		}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="initial-view select-none svelte-mk0wr"><div class="flex flex-col sm:flex-row items-center sm:justify-center w-full h-full sm:gap-10"><div class="left mt-4 mb-10 sm:flex-1 flex flex-col justify-center"><h1 class="text-5xl text-center sm:text-right">ChainPay</h1>
			<p class="text-center sm:text-right mt-4 max-w-md ml-auto">Automate token swaps with ease, pay any recipient in the token they want—ChainPay simplifies
				payments on BSC, with more chains coming soon.
			</p>

			<div class="justify-end w-full mt-6 hidden sm:flex items-center gap-4"><a href="https://github.com/Hattorius/ChainPay" target="_blank" class="h-8"><img src="/github.svg" class="h-8" alt="Github link"></a>
				<button class="hover:bg-gray-900 py-3 px-5 transition border">Developer docs </button></div></div>

		<div class="right sm:flex-1 flex"><div class="border p-4 w-80">${validate_component(CreatePaymentRequest, "CreatePaymentRequest").$$render($$result, {}, {}, {})}</div></div></div>

	<div class="justify-center w-full mt-8 flex sm:hidden">${validate_component(DevelopersButton, "DevelopersButton").$$render($$result, {}, {}, {})}</div>

	<div class="justify-center w-full mt-2 flex sm:hidden"><a href="https://github.com/Hattorius/ChainPay" target="_blank" class="h-8"><img src="/github.svg" class="h-8" alt="Github link"></a></div></div>

${validate_component(Index, "Index").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
