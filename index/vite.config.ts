import { sveltekit } from '@sveltejs/kit/vite';
import commonjs from 'vite-plugin-commonjs';
import { defineConfig } from 'vite';

import nodePolyfills from 'rollup-plugin-polyfill-node';

const MODE = process.env.NODE_ENV;
const development = MODE === 'development';

export default defineConfig({
	plugins: [
		sveltekit(),
		commonjs(),
		development &&
			nodePolyfills({
				include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
			})
	],
	optimizeDeps: {
		exclude: ['wrtc', 'http', 'viem'],
		include: [
			'@web3-onboard/core',
			'@web3-onboard/gas',
			'@web3-onboard/sequence',
			'js-sha3',
			'@ethersproject/bignumber'
		]
	},
	resolve: {
		alias: {
			'intl-messageformat': 'intl-messageformat/lib',
			'@formatjs/icu-messageformat-parser': '@formatjs/icu-messageformat-parser/lib',
			'@formatjs/icu-skeleton-parser': '@formatjs/icu-skeleton-parser/lib'
		}
	}
});
