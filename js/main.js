/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function addShowClass(number) {
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

/* toggles display of a modal content */
function toggleModal(id) {
  var element = document.getElementById(id);
  var display = element.style.display;
  if (display == 'flex') {
    element.style.display = 'none';
  } else {
    element.style.display = 'flex';
  }
}

const customText = document.getElementById('customText');
const realFileBtn = document.getElementById('imgRealBtn');
realFileBtn.addEventListener('change', function() {
  if (realFileBtn.value) {
    customText.innerHTML = realFileBtn.value.replace(/^.*[\\\/]/, '');
  }
})

const certificateForm = document.getElementById('addCertificate');
certificateForm.addEventListener('reset', function() {
  customText.innerHTML = 'No file chosen';
})

const customBtn = document.getElementById('imgUpload');
customBtn.addEventListener('click', function() {
  realFileBtn.click();
});
