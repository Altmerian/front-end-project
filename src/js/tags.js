import {searchByTag} from './index.js'

export function createTags(tags) {
	const parentElement = document.querySelector('.categories-wrapper');
	parentElement.append(...writeTagsContent(tags));
	for (const child of parentElement.children) {
		child.onclick = searchByTag;
	} 
}

function writeTagsContent(tags) {
	let result = [];
	const categoryDropdown = document.getElementById('myDropdown2');

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];

		categoryDropdown.insertAdjacentHTML('beforeend',
			`<a href="#" onclick="searchByTag(event)">${tag.name}</a>`);

		let div = document.createElement('div');
		div.className = 'category-figure';
		div.insertAdjacentHTML('beforeend',
			`<img src="/assets/logo.png" alt="Category img">
			 <div>${tag.name}</div>`);
		result.push(div);
	}

	return result;
}
