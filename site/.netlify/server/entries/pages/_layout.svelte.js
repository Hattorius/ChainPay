import { c as create_ssr_component } from "../../chunks/index3.js";
const global = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container mx-auto">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
