import type { Editor } from 'grapesjs';
import { myInputType } from './types/myInputType';

import { assetTrait } from './traits/assetTrait';

export const myNewComponentTypes = (editor: Editor) => {
	editor.DomComponents.addType('my-input-type', myInputType);
	// Create a block for the component, so we can drop it easily
	editor.Blocks.add('test-block', {
		category: 'custom',
		label: 'Test block',
		attributes: { class: 'fa fa-text' },
		content: { type: 'my-input-type' }
	});

	/**
	 * example to use custom trait types, we could later use svelte components for this as well but probably never will
	 */

	editor.TraitManager.addType('my-asset-select-type', assetTrait(editor));
};
