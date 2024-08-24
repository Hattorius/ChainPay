

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.131e7484.js","_app/immutable/chunks/index.00646974.js","_app/immutable/chunks/tokens.e8a42432.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.b1edd31c.js"];
export const stylesheets = ["_app/immutable/assets/2.8788d983.css"];
export const fonts = [];
