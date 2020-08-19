/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function addShowClass(number) {
  document.getElementById('myDropdown' + number).classList.toggle('show');
}

/* toggle display between registration and login forms */
function toggleModal(id) {
  if (location.pathname != '/login.html') {
    document.location.assign('../login.html');
  }
  document.body.addEventListener("load", switchDisplay);
}

function switchDisplay() {
  var element = document.getElementById('signUp');
  var display = element.style.display;
  var loginElement = document.getElementById('login');
  if (display == 'flex') {
    element.style.display = 'none';
    loginElement.style.display = 'block';
  }
  else {
    element.style.display = 'flex';
    loginElement.style.display = 'none';
  }
}

// Close the dropdown menus if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropdown-button')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

