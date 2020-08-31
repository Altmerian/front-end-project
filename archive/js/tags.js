import { searchByTag } from './index.js'

const TAGS_ON_PAGE = 6;

export function createTags(tags) {
	const parentElement = document.querySelector('.categories-wrapper');
	parentElement.append(...writeTagsContent(tags));
	for (const child of parentElement.children) {
		setTimeout(function () {
			child.style.opacity = 1;
		}, 500);
		child.onclick = searchByTag;
	}
}

function writeTagsContent(tags) {
	let result = [];
	const categoryDropdown = document.getElementById('myDropdown');

	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];

		categoryDropdown.insertAdjacentHTML('beforeend',
			`<a href="#" onclick="searchByTag(event)">${tag.name}</a>`);

		if (i < TAGS_ON_PAGE) {
			let div = document.createElement('div');
			div.className = 'category-figure';
			div.insertAdjacentHTML('beforeend',
			`<div class="tag-name">${tag.name}</div>`);
			result.push(div);
		}
	}

	return result;
}
