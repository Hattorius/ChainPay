export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["diagram.svg","discord.svg","favicon.png","github.svg","question.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.9fd9fa4f.js","app":"_app/immutable/entry/app.83fe05f2.js","imports":["_app/immutable/entry/start.9fd9fa4f.js","_app/immutable/chunks/index.00646974.js","_app/immutable/chunks/singletons.084dae75.js","_app/immutable/chunks/index.b1edd31c.js","_app/immutable/chunks/control.c2cf8273.js","_app/immutable/entry/app.83fe05f2.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.00646974.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/docs",
				pattern: /^\/docs\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/pay/[detail]",
				pattern: /^\/pay\/([^/]+?)\/?$/,
				params: [{"name":"detail","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
