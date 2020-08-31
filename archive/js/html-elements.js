// custom element to import html fragments
export class HTMLInclude extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = "Loading...";
		this.loadContent();
	}

	async loadContent() {
		const source = this.getAttribute("src");
		if (!source) {
			throw new Error("No src attribute given.");
		}
		const response = await fetch(source);
		if (response.status !== 200) {
			throw new Error(`Could not load resource: ${source}`);
		}
		const content = await response.text();
		this.innerHTML = content;
		let navbarLoaded = new Event('navbarLoaded')
		window.dispatchEvent(navbarLoaded);
	}
}

export function addLodingIcon() {
	if (!document.querySelector('.loading-icon')) {
		document.querySelector('section').insertAdjacentHTML('beforeend',
			`<div class="loading-icon">
				<img src="/assets/loading.gif" alt="loading...">
			</div>`);
	}
}
