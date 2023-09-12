import type { CustomTrait } from 'grapesjs';
import * as grapesjs from 'grapesjs';
export const assetTrait: CustomTrait<any> = {
	name: 'my-asset-select-type',
	label: 'My Custom Trait',

	createInput({ trait }: any) {
		// Here we can decide to use properties from the trait
		const traitOpts = trait.get('options') || [];
		const options = traitOpts.length
			? traitOpts
			: [
					{ id: 'url', name: 'URL' },
					{ id: 'email', name: 'Email' }
			  ];

		// Create a new element container and add some content
		const el = document.createElement('div');
		el.innerHTML = `
          <select class="href-next__type">
            ${options.map((opt: any) => `<option value="${opt.id}">${opt.name}</option>`).join('')}
          </select>
          <div class="href-next__url-inputs">
            <input class="href-next__url" placeholder="Insert URL"/>
          </div>
          <div class="href-next__email-inputs">
            <input class="href-next__email" placeholder="Insert email"/>
            <input class="href-next__email-subject" placeholder="Insert subject"/>
          </div>
        `;

		// Let's make our content interactive
		const inputsUrl = el.querySelector('.href-next__url-inputs') as HTMLDivElement;
		const inputsEmail = el.querySelector('.href-next__email-inputs') as HTMLDivElement;
		const inputType = el.querySelector('.href-next__type') as HTMLInputElement;
		inputType.addEventListener('change', (ev: any) => {
			switch (ev.target.value) {
				case 'url':
					inputsUrl.style.display = '';
					inputsEmail.style.display = 'none';
					break;
				case 'email':
					inputsUrl.style.display = 'none';
					inputsEmail.style.display = '';
					break;
			}
		});

		return el;
	},

	// // Define the HTML for the trait
	// templateInput: `
	//         <div>
	//             <button id="selectAssetBtn">Select Asset</button>
	//             <input type="text" id="assetUrl" readonly>
	//         </div>
	//     `,
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
