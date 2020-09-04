import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateNewComponent } from './certificate-new.component';

describe('CertificateNewComponent', () => {
  let component: CertificateNewComponent;
  let fixture: ComponentFixture<CertificateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
