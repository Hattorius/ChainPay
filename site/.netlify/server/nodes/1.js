

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d7019193.js","_app/immutable/chunks/index.00646974.js","_app/immutable/chunks/singletons.084dae75.js","_app/immutable/chunks/index.b1edd31c.js"];
export const stylesheets = [];
export const fonts = [];
