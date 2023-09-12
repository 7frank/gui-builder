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
			},
			// or
			//   plugins: [
			//     editor => plugin(editor, { /* options */ }),
			//   ],

			// disable storageManager for a moment to update assets when adding them here
			//storageManager: false,
			assetManager: {
				assets: [
				'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
				// Pass an object with your properties
				{
					type: 'image',
					src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
					height: 350,
					width: 250,
					name: 'displayName1'
				},
				{
					// As the 'image' is the base type of assets, omitting it will
					// be set as `image` by default
					src: 'https://media1.giphy.com/media/9d3LQ6TdV2Flo8ODTU/giphy.gif?cid=6c09b952qz58pbx4albr0f0py1hhu1dhbshrqg0lecpxl0vw&ep=v1_gifs_search&rid=giphy.gif&ct=g',
					height: 350,
					width: 250,
					name: 'displayName2'
				},
				],
		}

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
