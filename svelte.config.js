import adapter from '@sveltejs/adapter-auto';

// TODO find out if we want to use sveltePreprocess over vitePreprocess
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	// Note: we use sveltePreprocess, to be abler to override the typescript compiler by applying a patch to the compiled source files
	preprocess: [sveltePreprocess()], // vitePreprocess()

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	compilerOptions: {
		accessors: true
	}
};

export default config;
