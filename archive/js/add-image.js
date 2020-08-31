// hidden real button will be pressed 
// on custom image upload button click
const customText = document.getElementById('customText');
const realFileBtn = document.getElementById('imgRealBtn');
realFileBtn.addEventListener('change', function () {
  if (realFileBtn.value) {
    customText.innerHTML = realFileBtn.value.replace(/^.*[\\\/]/, '');
  }
})

const certificateForm = document.getElementById('addCertificate');
certificateForm.addEventListener('reset', function () {
  customText.innerHTML = 'No file chosen';
})

const customBtn = document.getElementById('imgUpload');
customBtn.addEventListener('click', function () {
  realFileBtn.click();
});
