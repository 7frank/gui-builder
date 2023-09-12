import type { CustomTrait, Editor } from 'grapesjs';
export const assetTrait: (editor: Editor) => CustomTrait<any> = (editor) => ({
	name: 'my-asset-select-type',
	label: 'My Custom Trait',

	createInput({ trait }: any) {
		// Here we can decide to use properties from the trait
		//const traitOpts = trait.get('options') || [];
		const src = trait.get('src') || 'https://...';
		// Create a new element container and add some content
		const el = document.createElement('div');
		el.innerHTML = `
        <input type="text" id="assetUrl" value=${src} readonly>
        <button id="selectAssetBtn">Select Asset</button> 
        `;

		const btnEl = el.querySelector('#selectAssetBtn') as HTMLButtonElement;
		btnEl.addEventListener('click', () => this.openAssetManager());

		return el;
	},
	openAssetManager: function () {
		console.log('openAssetManager', this, editor);
		const am = editor.AssetManager;

		// Define filters for file types or MIME types
		// const filters = [
		// 	{ name: 'Images', extensions: 'png,jpg,jpeg,gif' },
		// 	{ name: 'JSON Files', extensions: 'json' }
		// 	// Add more filters as needed
		// ];

		// Open the Asset Manager dialog with filters
		am.open({
			types: ['image'],

			select(asset, complete) {
				const selected = editor.getSelected();
				console.log('select', selected, asset, asset.getSrc());
				if (selected) {
					selected.addAttributes({ src: asset.getSrc() });
				}

				am.close();
				// if (selected && selected.is('image')) {
				// 	selected.addAttributes({ src: asset.getSrc() });
				// 	// The default AssetManager UI will trigger `select(asset, false)` on asset click
				// 	// and `select(asset, true)` on double-click
				// 	complete && am.close();
				// }
			}
		});
	}
});
