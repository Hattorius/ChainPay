

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.a05952fb.js","_app/immutable/chunks/index.00646974.js"];
export const stylesheets = ["_app/immutable/assets/0.68c43578.css"];
export const fonts = [];
