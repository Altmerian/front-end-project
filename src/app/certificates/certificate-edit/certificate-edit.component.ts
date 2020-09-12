import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Certificate } from 'src/app//shared/models/certificate';
import { CertificateService } from '../certificate.service';
import { Tag } from 'src/app/shared/models/tag';
import { TagService } from 'src/app/tags/tag.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss']
})
export class CertificateEditComponent implements OnInit {
  certificate: Certificate = new Certificate();
  tags: Tag[] = [];
  filteredTags: Observable<string[]>;

  tagSelect = new FormControl('', Validators.required);

  certificateForm = this.fb.group({
    itemName: ['', Validators.required],
    tag: this.tagSelect,
    durationInDays: ['', Validators.required],
    price: ['', Validators.required],
    description: [''],
    image: [''],
  });
  isValid: boolean = this.certificateForm.valid;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tagService: TagService,
    private certificateService: CertificateService,
    private eventService: EventService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._getCertificate();
    this.tagService.getTags(1, 50).subscribe(data => this.tags = data);
    this.eventService.initImageButton();
    this.filteredTags = this.tagSelect.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  confirmChanges(): void {
    const editConfirm = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Certificate update',
        content: `Do you really want to save changes?`,
        buttonLabel: 'Yes'
      }
    });
    editConfirm.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this._editCertificate();
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl(`/certificate/${this.certificate.id}`);
  }

  private _editCertificate(): void {
    const certificate = this._parseFormValues();
    this.certificateService.updateCertificate(certificate).subscribe(resp => {
      console.log(resp);
      if (resp.status === 204) {
        const id = this.certificate.id;
        this.messageService.message('Update Certificate', `Changes in Certificate with id=${id} has been saved`, 'Got it!');
        console.log(`Certificate with id=${id} was changed`);
      }
    }, error => {
      this.messageService.errorMessage(error.error.messages[0]);
      console.log(error);
    });
  }

  private _getCertificate(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.certificateService.getCertificate(id).subscribe(data => {
      this.certificate = data;
      this._initForm();
    });
  }

  private _initForm(): void {
    this.tagSelect.setValue(this.certificate.tags[0].name);
    this.certificateForm.get('itemName').setValue(this.certificate.name);
    this.certificateForm.get('tag').setValue(this.certificate.tags[0].name);
    this.certificateForm.get('durationInDays').setValue(this.certificate.durationInDays);
    this.certificateForm.get('price').setValue(this.certificate.price);
    this.certificateForm.get('description').setValue(this.certificate.description);
  }

  private _parseFormValues(): Certificate {
    const certificate = new Certificate();
    certificate.id = this.certificate.id;
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
    return value.toLowerCase().replace(/\s/g, '');
  }

}
