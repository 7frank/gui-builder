import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from 'vitest/config';
import typescript from '@rollup/plugin-typescript';

// https://github.com/nonara/ts-patch/issues/106
// https://github.com/sveltejs/svelte-preprocess/issues/537
// Note: potentially configure rollup and plugins instead of tsconfig -- https://github.com/jirutka/ts-transformer-export-default-name/tree/master
// @ts-ignore
import tspCompiler from 'ts-patch/compiler';

export default defineConfig({
	plugins: [sveltekit(), typescript({ typescript: tspCompiler })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
