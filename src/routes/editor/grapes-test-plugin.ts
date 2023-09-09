import type { Editor, AddComponentTypeOptions } from 'grapesjs';

export const myNewComponentTypes = (editor: Editor) => {
	const myInputType: AddComponentTypeOptions = {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el) => el.tagName === 'INPUT',

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName: 'input',
				draggable: '*', // Can be dropped only inside `form` elements
				droppable: false, // Can't drop other elements inside
				attributes: {
					// Default attributes
					type: 'text',
					name: 'default-name',
					placeholder: 'Insert text here: ' + 'plugin-test-before'
				},
				traits: ['name', 'placeholder', { type: 'checkbox', name: 'required' }]
			}
		}
	};
	editor.DomComponents.addType('my-input-type', myInputType);

	// Create a block for the component, so we can drop it easily
	editor.Blocks.add('test-block', {
		category: 'svelte',
		label: 'Test block',
		attributes: { class: 'fa fa-text' },
		content: { type: 'my-input-type' }
	});

	const mySvelteImageType: AddComponentTypeOptions = {
		// Make the editor understand when to bind `my-input-type`
		isComponent: (el) => el.tagName === 'MY-SVELTE-IMAGE',

		// Model definition
		model: {
			// Default properties
			defaults: {
				tagName: 'my-svelte-image',
				draggable: '*',
				droppable: false,
				attributes: {
					// 	// Default attributes
					// 	type: 'text',
					// 	name: 'default-name',
					// 	placeholder: 'Insert text here: ' + 'plugin-test-before'
				}

				// traits: ['name', 'placeholder', { type: 'checkbox', name: 'required' }]
			}
		}
	};
	editor.DomComponents.addType('my-svelte-image-type', mySvelteImageType);

	editor.Blocks.add('my-svelte-image-block', {
		category: 'svelte',
		label: 'my-svelte-image block',
		attributes: {
			//class: 'fa fa-text'
		},
		content: { type: 'my-svelte-image-type' }
	});
};
