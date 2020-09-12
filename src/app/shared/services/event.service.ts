import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  // When custom image upload button clicks, the hidden real button will be pressed on
  initImageButton(): void {
    const customText = document.getElementById('customText');
    const realFileBtn = document.getElementById('imgRealBtn') as HTMLInputElement;
    realFileBtn.addEventListener('change', () =>  {
      if (realFileBtn.value) {
        customText.innerHTML = realFileBtn.value.replace(/^.*[\\\/]/, '');
      }
    });

    const certificateForm = document.getElementById('addCertificate');
    certificateForm.addEventListener('reset', () => {
      customText.innerHTML = 'No file chosen';
    });

    const customBtn = document.getElementById('imgUpload');
    customBtn.addEventListener('click', () => {
      realFileBtn.click();
    });
  }
}

