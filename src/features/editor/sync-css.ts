// Function to copy script tags to the iframe
function copyScriptTagsToIframe(iframe: HTMLIFrameElement, scriptSelector: string): void {
	const scriptTags = document.querySelectorAll<HTMLScriptElement>(scriptSelector);

	scriptTags.forEach((scriptTag) => {
		const devId = scriptTag.getAttribute('data-vite-dev-id');
		if (!devId) return;

		// Add the new script to the iframe
		iframe.contentDocument?.body.appendChild(scriptTag.cloneNode(true));

		const existingScripts = iframe.contentDocument?.querySelectorAll(
			`style[data-vite-dev-id="${devId}"]`
		);
		if (existingScripts) {
			const all = [...existingScripts];

			all.pop();

			all.forEach((it) => it.remove());
		}
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
 *
 */
export function syncCss() {
	// Run the function every second
	runCopyScriptEverySecond();
	setInterval(runCopyScriptEverySecond, 3000); // 1000 milliseconds (1 second)
}
