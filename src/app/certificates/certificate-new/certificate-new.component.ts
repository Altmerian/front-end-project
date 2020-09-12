import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { TagService } from 'src/app/tags/tag.service';
import { Tag } from 'src/app//shared/models/tag';
import { Certificate } from 'src/app//shared/models/certificate';
import { CertificateService } from '../certificate.service';
import { EventService } from 'src/app/shared/services/event.service';
import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';

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
    private dialog: MatDialog,
    private fb: FormBuilder,
    private tagService: TagService,
    private certificateService: CertificateService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.tagService.getTags(1, 50).subscribe(data => this.tags = data);
    this.eventService.initImageButton();
    this.filteredTags = this.tagSelect.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  addCertificate(): void {
    const certificate = this._parseFormValues();
    this.certificateService.addCertificate(certificate).subscribe(resp => {
      console.log(resp);
      if (resp.status === 201) {
        certificate.id = resp.headers.get('Location').replace(/^.*[\\\/]/, '');
        this._openDialog(certificate.id);
      }
    }, error => {
      console.log(error);
    });
  }

  private _openDialog(id: string): void {
    const loginAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'New Certificate',
        content: `Certificate has been created with id=${id}. To check out press the link below: `,
        buttonLabel: 'Got it!',
        link: `certificate/${id}`
      }
    });
    // loginAlert.afterClosed().subscribe(_ => this.goBack());
  }

  private _parseFormValues(): Certificate {
    const certificate = new Certificate();
    certificate.name = this.certificateForm.value.itemName;
    const tag = new Tag(this.certificateForm.value.tag);
    certificate.tags = new Array<Tag>(tag);
    certificate.description = this.certificateForm.value.description;
    certificate.price = this.certificateForm.value.price.toFixed(2);
    certificate.durationInDays = this.certificateForm.value.durationInDays.toFixed(0);
    return certificate;
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.tags
      .map(tag => tag.name)
      .filter(tagName => this._normalizeValue(tagName).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value?.toLowerCase().replace(/\s/g, '');
  }

}
