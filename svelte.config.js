import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			out: 'build',
			precompress: true
		}),
		alias: {
			'@controllers': resolve('./src/controllers'),
			'@models': resolve('./src/models'),
			'@views': resolve('./src/views'),
			'@routes': resolve('./src/routes'),
			'@server': resolve('./src/server'),
			'@assets': resolve('./src/assets'),
			'@/*': './path/to/lib/*'
		},
	}
};

export default config;
