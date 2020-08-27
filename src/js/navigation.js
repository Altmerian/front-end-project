/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export function addShowClass(number) {
  document.getElementById('myDropdown' + number).classList.toggle('show');
}

// Close the dropdown menus if the user clicks outside of it
export function removeShowClass(event) {
  if (!event.target.matches('.dropdown-button, .dropdown-input')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* toggles display of a modal content */
export function toggleModal(id) {
  const element = document.getElementById(id);
  const display = element.style.display;
  if (display == 'flex') {
    element.style.display = 'none';
  } else {
    element.style.display = 'flex';
  }
}

export function addScrollTopEvent() {
  const element = document.querySelector('.scroll-top');
  element.addEventListener('click', () => {
    window.scrollTo(0, 0);
  })
}

export function goBack() {
  window.history.back();
}

export function saveScroll() {
  localStorage.scrollLeft = window.pageXOffset;
  localStorage.scrollTop = window.pageYOffset;
}

export function setScroll() {
  let x = localStorage.scrollLeft;
  let y = localStorage.scrollTop;
  window.scrollTo(x, y);
}
