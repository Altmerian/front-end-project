import '../scss/main.scss'
import '../css/variables.css'

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
window.addShowClass = function addShowClass(number) {
  document.getElementById('myDropdown' + number).classList.toggle('show');
}

// Close the dropdown menus if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropdown-button')) {
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
window.toggleModal = function toggleModal(id) {
  const element = document.getElementById(id);
  const display = element.style.display;
  if (display == 'flex') {
    element.style.display = 'none';
  } else {
    element.style.display = 'flex';
  }
}

// go to previous page
window.goBack = function goBack() {
  window.history.back();
}