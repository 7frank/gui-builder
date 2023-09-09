<script lang="ts">
	import grapesjs, { Editor, type AddComponentTypeOptions } from 'grapesjs';
	import 'grapesjs/dist/css/grapes.min.css';

	import plugin from 'grapesjs-preset-webpage';
	import basicBlocks from 'grapesjs-blocks-basic';
	import { onMount } from 'svelte';
	import { myNewComponentTypes } from './grapes-test-plugin';
	import Image from './components/Image.svelte';

	// https://github.com/sveltejs/svelte-preprocess/issues/537
	// this value should be replaced by the typescript compiler in case this is called for this svelte file
	const foo = 'plugin-test-before';

	// customElements.define('my-svelte-image', Image.element);

	onMount(() => {
		const editor = grapesjs.init({
			container: '#guiBuilder',
			// ...
			plugins: [ myNewComponentTypes,basicBlocks, plugin],
			pluginsOpts: {
				[plugin]: {
					/* options */
				}
			}
			// or
			//   plugins: [
			//     editor => plugin(editor, { /* options */ }),
			//   ],
		});
	});
</script>

<svelte:head>
	<title>Gui-Builder</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Image></Image>
<my-svelte-image></my-svelte-image>

<div id="guiBuilder" />

<style>
</style>
