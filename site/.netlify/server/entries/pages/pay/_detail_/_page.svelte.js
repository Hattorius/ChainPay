import { c as create_ssr_component, v as validate_component, e as escape, d as add_attribute } from "../../../../chunks/index3.js";
import { T as TokenPicker, t as tokens } from "../../../../chunks/tokens.js";
import chainpay from "chainpay";
import "@web3-onboard/injected-wallets";
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 class="mt-8 text-5xl text-center">ChainPay</h1>
`;
});
const NotFound = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-80 mx-auto p-4 mt-4 border">Could not find the transaction. Please ask a new link from the person that created this
	transaction
</div>`;
});
const Widget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { transaction } = $$props;
  let paymentDue;
  if ($$props.transaction === void 0 && $$bindings.transaction && transaction !== void 0)
    $$bindings.transaction(transaction);
  chainpay.constants.CHAINPAY_CONTRACT_ADDRESS;
  {
    {
      paymentDue = void 0;
    }
  }
  paymentDue ? paymentDue : BigInt(0);
  return `${`<div class="text-base"><p>Pick a token to pay with</p>
		${validate_component(TokenPicker, "TokenPicker").$$render(
    $$result,
    {
      tokens: [tokens.get(transaction.token), ...tokens.getPaired(transaction.token)]
    },
    {},
    {}
  )}

		${`<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition">Please select a token
			</button>`}</div>`}`;
});
const Name = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { address } = $$props;
  let name = `${address.substring(0, 6)}...${address.substring(38)}`;
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  return `${escape(name)}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${!data.success ? `${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}
	${validate_component(NotFound, "NotFound").$$render($$result, {}, {}, {})}` : `${!data.embed ? `${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}` : ``}

	<div class="${[
    "w-80 mx-auto p-4",
    (!data.embed ? "border" : "") + " " + (!data.embed ? "mt-6" : "")
  ].join(" ").trim()}">${validate_component(Widget, "Widget").$$render($$result, { transaction: data.transactionDetails }, {}, {})}</div>

	${!data.embed ? `<p class="text-center mt-2">Requested by
			<a class="font-semibold border-b"${add_attribute("href", `https://bscscan.com/address/${data.transactionDetails.recipient}`, 0)} target="_blank">${validate_component(Name, "Name").$$render(
    $$result,
    {
      address: data.transactionDetails.recipient
    },
    {},
    {}
  )}</a></p>` : ``}`}`;
});
export {
  Page as default
};
