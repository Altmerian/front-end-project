import '../scss/main.scss'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import * as Navigation from './navigation'
import { HTMLInclude, addLodingIcon } from './html-elements'
import { createContent, removeContent, wtiteNoResults, checkMoreContent } from './certificates'
import { createTags } from './tags'


let certificates;
let tags;
let currentPage = 0;

if (location.pathname.endsWith('index.html')) {
  (async function fetchData() {
    certificates = await getCertificates(1, 100);
    tags = await getTags(1, 8);
    localStorage.certificates = JSON.stringify(certificates);
    localStorage.tags = JSON.stringify(tags);
    createTags(tags);
    createContent(certificates, currentPage);
  })();
}

const navbarLoadedCallback = function () {
  const searchElement = document.getElementById('searchPanel');
  searchElement.addEventListener('input', debounce(searchCertificates, 1000));
}

//navigation events
window.addShowClass = Navigation.addShowClass;
window.onclick = Navigation.removeShowClass;
window.addEventListener('navbarLoaded', navbarLoadedCallback);
window.addEventListener('body-loaded', Navigation.scrollTop);
window.addEventListener('scroll', throttle(checkWindowScroll, 200)
);

function checkWindowScroll() {
  if (((window.pageYOffset + document.documentElement.clientHeight + 50) >=
        document.documentElement.scrollHeight) &&
        checkMoreContent(certificates, currentPage)) {
    currentPage++;
    addLodingIcon();
    setTimeout(function () {
      document.querySelector('.loading-icon').remove();
      createContent(certificates, currentPage);
    }, 700);
  }
}

//define custom html element to include navbar to every page
window.customElements.define("html-include", HTMLInclude);

//other basic events
window.toggleModal = Navigation.toggleModal;
window.goBack = Navigation.goBack;

async function getTags(page, size) {
  let response = await fetch(
    `http://localhost:8088/gift-rest-service/api/v1/tags/?page=${page}&size=${size}`);
  if (response.ok) {
    let json = await response.json();
    return json.tags;
  } else {
    console.log('Could not load tags: ' + response.status);
  }
}

async function getCertificates(page, size, search = '', tag = '') {
  let response = await fetch(
    `http://localhost:8088/gift-rest-service/api/v1/certificates/?page=${page}&size=${size}&search=${search}&tag=${tag}&sort=-creation_date`);
  if (response.ok) {
    let json = await response.json();
    return json.certificates;
  } else {
    console.log('Could not load certificates: ' + response.status);
  }
}

async function searchCertificates(event) {
  currentPage = 0;
  let search = event.target.value;

  removeContent();
  certificates = await getCertificates(1, 100, search);
  if (certificates.length) {
    createContent(certificates, currentPage);
  } else {
    wtiteNoResults(search);
  }
}

export async function searchByTag(event) {
  currentPage = 0;
  const searchElement = document.getElementById('searchPanel');
  searchElement.value = '';

  let target = event.currentTarget;
  let tagName;
  if (target.tagName === 'FORM') {
    event.preventDefault();
    let input = target.querySelector('input.dropdown-input');
    tagName = input.value;
  } else {
    tagName = target.textContent.trim();
  }

  removeContent();
  certificates = await getCertificates(1, 100, '', tagName);
  if (certificates.length !== 0) {
    createContent(certificates, currentPage);
  } else {
    wtiteNoResults(tagName);
  }
}
window.searchByTag = searchByTag;
