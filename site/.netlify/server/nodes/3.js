

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/docs/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.c9513b46.js","_app/immutable/chunks/index.00646974.js"];
export const stylesheets = [];
export const fonts = [];
