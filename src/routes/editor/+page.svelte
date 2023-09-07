<script lang="ts">
import grapesjs, { Editor, type AddComponentTypeOptions } from 'grapesjs';
import  'grapesjs/dist/css/grapes.min.css';

import plugin from 'grapesjs-preset-webpage';
import basicBlocks from 'grapesjs-blocks-basic';
import {onMount} from "svelte"
	import { myNewComponentTypes } from './grapes-test-plugin';



onMount(()=>{
	const editor = grapesjs.init({
  container : '#guiBuilder',
  // ...
  plugins: [basicBlocks,myNewComponentTypes,plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
//   plugins: [
//     editor => plugin(editor, { /* options */ }),
//   ],
});


})

</script>

<svelte:head>
	<title>Gui-Builder</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div id="guiBuilder"></div>

<style>

</style>
