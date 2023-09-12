// Function to copy script tags to the iframe
function copyScriptTagsToIframe(iframe: HTMLIFrameElement, scriptSelector: string): void {
	const scriptTags = document.querySelectorAll<HTMLScriptElement>(scriptSelector);

	const scriptMap = new Map<string, HTMLScriptElement>(); // Store the last script for each devId

	scriptTags.forEach((scriptTag) => {
		const devId = scriptTag.getAttribute('data-vite-dev-id');
		if (!devId) return;
		// If a script with the same data-vite-dev-id already exists in the map, remove it from the iframe
		if (scriptMap.has(devId)) {
			const existingScript = iframe.contentDocument?.querySelector(
				`script[data-vite-dev-id="${devId}"]`
			);
			if (existingScript) {
				existingScript.remove();
			}
		}

		// Add the script to the map
		scriptMap.set(devId, scriptTag);

		// Add the new script to the iframe
		iframe.contentDocument?.body.appendChild(scriptTag.cloneNode(true));
	});
}

// Function to run the copyScriptTagsToIframe function every second
function runCopyScriptEverySecond() {
	const iframeSelector = 'iframe.gjs-frame';
	const scriptSelector = 'style[data-vite-dev-id]';

	// Find the iframe
	const iframe = document.querySelector<HTMLIFrameElement>(iframeSelector);

	if (iframe) {
		copyScriptTagsToIframe(iframe, scriptSelector);
	}
}

/**
 * This function ensures to copy css that svelte generates at runtime , to be copied into our grapesjs iframe
 * Note: this probably will only happen in development mode
 */
export function syncCss() {
	// Run the function every second
	setInterval(runCopyScriptEverySecond, 1000); // 1000 milliseconds (1 second)
}
