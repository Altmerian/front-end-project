import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { TagService } from 'src/app/tags/tag.service';
import { Tag } from 'src/app/models/tag';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-certificate-new',
  templateUrl: './certificate-new.component.html',
  styleUrls: ['./certificate-new.component.scss']
})
export class CertificateNewComponent implements OnInit {
  myControl = new FormControl();
  tags: Tag[] = [];
  tagName: string;
  @ViewChildren(MatMenuTrigger) tagMenuTrigger: QueryList<MatMenuTrigger>;

  constructor(
    private tagService: TagService,
  ) { }

  ngOnInit(): void {
    this.tagService.getTags(1, 50).subscribe(data => this.tags = data);
    this.initImageButton();
  }

  // hidden real button will be pressed
  // on custom image upload button click
  private initImageButton() {
    const customText = document.getElementById('customText');
    const realFileBtn = document.getElementById('imgRealBtn') as HTMLInputElement;
    realFileBtn.addEventListener('change', function () {
      if (realFileBtn.value) {
        customText.innerHTML = realFileBtn.value.replace(/^.*[\\\/]/, '');
      }
    });

    const certificateForm = document.getElementById('addCertificate');
    certificateForm.addEventListener('reset', function () {
      customText.innerHTML = 'No file chosen';
    });

    const customBtn = document.getElementById('imgUpload');
    customBtn.addEventListener('click', function () {
      realFileBtn.click();
    });
  }
}


