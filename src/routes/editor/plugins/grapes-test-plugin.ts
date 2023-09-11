import type { Editor } from 'grapesjs';
import { myInputType } from './types/myInputType';
import { mySvelteImageType } from './types/mySvelteImageType';

export const myNewComponentTypes = (editor: Editor) => {
	// editor.DomComponents.addType('my-input-type', myInputType);
	// // Create a block for the component, so we can drop it easily
	// editor.Blocks.add('test-block', {
	// 	category: 'svelte',
	// 	label: 'Test block',
	// 	attributes: { class: 'fa fa-text' },
	// 	content: { type: 'my-input-type' }
	// });
	// editor.DomComponents.addType('my-svelte-image-type', mySvelteImageType);
	// editor.Blocks.add('my-svelte-image-block', {
	// 	category: 'svelte',
	// 	label: 'my-svelte-image block',
	// 	attributes: {
	// 		//class: 'fa fa-text'
	// 	},
	// 	content: { type: 'my-svelte-image-type' }
	// });
};
