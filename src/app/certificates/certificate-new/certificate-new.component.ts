import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/tags/tag.service';
import { Tag } from 'src/app/models/tag';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Certificate } from 'src/app/models/certificate';
import { CertificateService } from '../certificate.service';

@Component({
  selector: 'app-certificate-new',
  templateUrl: './certificate-new.component.html',
  styleUrls: ['./certificate-new.component.scss']
})
export class CertificateNewComponent implements OnInit {
  tagSelect = new FormControl('', Validators.required);
  certificateForm = this.fb.group({
    itemName: ['', Validators.required],
    tag: this.tagSelect,
    durationInDays: ['', Validators.required],
    price: ['', Validators.required],
    description: [''],
    image: [''],
  });
  tags: Tag[] = [];
  filteredTags: Observable<string[]>;
  isValid: boolean = this.certificateForm.valid;

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private certificateService: CertificateService,
  ) { }

  ngOnInit(): void {
    this.tagService.getTags(1, 50).subscribe(data => this.tags = data);
    this._initImageButton();
    this.filteredTags = this.tagSelect.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  addCertificate() {
    const certificate = this._parseFormValues();
    this.certificateService.addCertificate(certificate).subscribe(resp => {
      console.log(resp);
      if (resp.status === 201) {
        console.log(resp.headers.get('Location'));
      }
    }, error => {
      console.log(error);
    })
  }

  private _parseFormValues() {
    const certificate = new Certificate();
    certificate.name = this.certificateForm.value.itemName;
    const tag = new Tag(this.certificateForm.value.tag);
    certificate.tags = new Array<Tag>(tag);
    certificate.description = this.certificateForm.value.description;
    certificate.price = this.certificateForm.value.price;
    certificate.durationInDays = this.certificateForm.value.durationInDays;
    return certificate;
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.tags
      .map(tag => tag.name)
      .filter(tagName => this._normalizeValue(tagName).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // hidden real button will be pressed
  // on custom image upload button click
  private _initImageButton() {
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


