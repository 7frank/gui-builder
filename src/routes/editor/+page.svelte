<script lang="ts">
	import grapesjs, { Editor, type AddComponentTypeOptions } from 'grapesjs';
	import 'grapesjs/dist/css/grapes.min.css';
    
	// import components to add them to the dependency tree so that the current compile step recognizes them
	import "./components/whiteList"
	import plugin from 'grapesjs-preset-webpage';
	import basicBlocks from 'grapesjs-blocks-basic';
	import { onMount } from 'svelte';
	

	// https://github.com/sveltejs/svelte-preprocess/issues/537
	// this value should be replaced by the typescript compiler in case this is called for this svelte file
	const foo = 'plugin-test-before';


	onMount(async () => {

		const  generatedPlugins=  await import("../../../.generated/plugin")
 
		const editor = grapesjs.init({
			container: '#guiBuilder',
			// ...
			plugins: [generatedPlugins.svelteGrapesComponentsPlugin,basicBlocks, plugin],
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


<div id="guiBuilder" />

<style>
</style>
