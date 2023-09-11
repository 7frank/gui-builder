import type { AddComponentTypeOptions } from 'grapesjs';
import Image from '../../components/Image.svelte';
import Button from '../../components/Button.svelte';

/**
 * 	 FIXME currently we reattach the svelte element in onRender, but this way when we want to delete the element it stays and we have to refresh the page
 */
export const mySvelteImageType: AddComponentTypeOptions = {
	model: {
		defaults: {
			// Define the default content and style of your custom component
			//content: '<div class="my-svelte-image-type">My Svelte Image Type Content</div>',
			//style: {}
		}
	},
	view: {
		init() {
			this.renderSvelteComponent();
		},
		renderSvelteComponent() {
			// Render the Svelte component within the custom component's view
			setTimeout(() => {
				this.mySvelteComponent = new Image({
					target: this.el
					// Optionally pass props to your Svelte component
					// props: {},
				});
				setTimeout(() => {
					this.svelteElement = this.el.querySelector(':first-child');
				}, 1);
			}, 1);
		},
		onRender() {
			if (this.svelteElement) this.el.appendChild(this.svelteElement);
		},
		remove() {
			// Clean up the Svelte component when the custom component is removed
			this.mySvelteComponent?.$destroy();

			// delete this.svelteElement;
			return this;
		}
	}
};
