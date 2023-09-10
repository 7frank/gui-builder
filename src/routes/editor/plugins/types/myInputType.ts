import type { AddComponentTypeOptions } from 'grapesjs';

export const myInputType: AddComponentTypeOptions = {
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
