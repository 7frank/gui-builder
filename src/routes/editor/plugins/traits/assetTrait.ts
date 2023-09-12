import type { CustomTrait } from 'grapesjs';
import * as grapesjs from 'grapesjs';
export const assetTrait: CustomTrait<any> = {
	name: 'my-asset-select-type',
	label: 'My Custom Trait',
	// Define the HTML for the trait
	templateInput: `
            <div>
                <button id="selectAssetBtn">Select Asset</button>
                <input type="text" id="assetUrl" readonly>
            </div>
        `,
	// Define the events and logic for the button
	events: {
		'click #selectAssetBtn': 'openAssetManager'
	},
	openAssetManager: function () {
		console.log('openAssetManager');
		const am = this.editor.AssetManager;

		// Define filters for file types or MIME types
		const filters = [
			{ name: 'Images', extensions: 'png,jpg,jpeg,gif' },
			{ name: 'JSON Files', extensions: 'json' }
			// Add more filters as needed
		];

		// Open the Asset Manager dialog with filters
		am.open({
			type: 'image', // Set the type to 'image' or 'file' as needed
			filters: filters,
			callback: (url: string) => {
				// Access the DOM elements associated with the trait

				const assetUrlInput = this.querySelector('#assetUrl') as HTMLInputElement;

				if (assetUrlInput) {
					assetUrlInput.value = url;
				}

				// Update the trait value with the selected asset URL
				const selectedComponent = this.editor.getSelected();
				if (selectedComponent) {
					selectedComponent.setAttributes({ src: url });
				}
			}
		});
	}
};
