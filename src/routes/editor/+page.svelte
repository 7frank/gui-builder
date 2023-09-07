<script>
import grapesjs from 'grapesjs';
import  'grapesjs/dist/css/grapes.min.css';

import plugin from 'grapesjs-preset-webpage';
import {onMount} from "svelte"



onMount(()=>{
	const editor = grapesjs.init({
  container : '#guiBuilder',
  // ...
  plugins: [plugin],
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
