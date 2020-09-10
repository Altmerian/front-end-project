import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CertificateService } from '../certificate.service';
import { Certificate } from 'src/app//shared/models/certificate';
import { UserService } from 'src/app/users/user.service';
import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {

  certificate: Certificate = new Certificate();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private certificateService: CertificateService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getCertificate();
  }

  getCertificate(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.certificateService.getCertificate(id).subscribe(data => {
      this.certificate = data;
    });
  }

  editItem() {
    this.router.navigate([this.router.url, 'edit'], {state: this.certificate});
  }

  confirmDelete() {
    const deleteConfirm = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Certificate delete',
        content: `Do you really want to delete Certificate with id=${this.certificate.id}?`,
        buttonLabel: 'Yes'
      }
    });
    deleteConfirm.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this._deleteItem();
      }
    });
  }

  private _deleteItem() {
    this.certificateService.deleteCertificate(this.certificate).subscribe(_ => {
        this._openDialog(this.certificate.id);
      }

    );
  }

  private _openDialog(id: string) {
    const dialogAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'Deleted',
        content: `Certificate with id=${id} was deleted`,
        buttonLabel: 'Home'
      }
    });
    dialogAlert.afterClosed().subscribe(_ => this.router.navigateByUrl(''));
  }
}
