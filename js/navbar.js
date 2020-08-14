/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction(number) {
  document.getElementById('myDropdown' + number).classList.toggle('show');
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