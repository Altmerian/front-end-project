let parentElement = document.querySelector('section');
const PAGE_SIZE = 10;

export function createContent(certificates, page) {
	let startIndex = page * PAGE_SIZE;
	parentElement.append(...writeCertificatesContent(certificates, startIndex));
}

export function checkMoreContent(certificates, currentPage) {
	if (PAGE_SIZE * (currentPage + 1) < certificates.length) {
		return true;
	}
	return false;
}

export function removeContent() {
	if (!parentElement) {
		let main = document.querySelector('main')
		main.innerHTML = '<section class="certificates-container"></section>';
		parentElement = document.querySelector('section');
	}
	while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
}

export function wtiteNoResults(search) {
	parentElement.innerHTML = `<p>No results were found for your search: "${search}" :(.<p>`
  }

function writeCertificatesContent(certificates, startIndex) {
	let result = [];
	let endIndex = Math.min(startIndex + 10, certificates.length) 

	for (let i = startIndex; i < endIndex; i++) {
		let certificate = certificates[i];
		let div = document.createElement('div');
		div.className = 'card';
		div.insertAdjacentHTML('beforeend',
			 `<a href="certificate.html"><img src="/assets/logo1.png" alt="Certificate img"></a>
				<div class="card-text">
					<div>
						<span class="card-item-name">${certificate.name}</span>
						<i class="material-icons">favorite_border</i>
					</div>
					<div class="card-description">${certificate.description}</div>
					<span>Expires in ${certificate.durationInDays} days</span>
					<div>
						<span class="price">$${certificate.price.toFixed(2)}</span>
						<button class="card-btn">Add to Cart</button>
					</div>
				</div>`);
		result.push(div);
	}

	return result;
}
