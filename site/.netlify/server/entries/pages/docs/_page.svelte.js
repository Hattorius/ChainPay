import { c as create_ssr_component, f as each, d as add_attribute, e as escape } from "../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let headers;
  let content;
  headers = content;
  return `<div class="pt-16 h-screen flex flex-col gap-10"><h1 class="text-5xl text-center">ChainPay</h1>

	<div class="flex-1"><div class="max-w-screen-lg w-full mx-auto flex gap-4"><div>${headers ? `${each(headers, (header) => {
    return `<p class="text-lg pb-0.5">${escape(header.h2)}</p>
                        ${each(header.h3, (subHeader) => {
      return `<p class="pl-4">${escape(subHeader)}</p>`;
    })}`;
  })}` : ``}</div>

			<div class="flex-1"${add_attribute("this", content, 0)}><h2 class="text-3xl">Introduction</h2>
				<h3 class="text-xl">About</h3>

				<h2 class="text-3xl">Example</h2></div></div></div></div>`;
});
export {
  Page as default
};
