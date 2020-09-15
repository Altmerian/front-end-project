import { Component, OnInit } from '@angular/core';

import { Tag } from 'src/app/shared/models/tag';
import { TagService } from '../tag.service';
import { CertificateService } from 'src/app/certificates/certificate.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = new Array<Tag>();
  TAGS_ON_PAGE = 6;

  constructor(
    private tagService: TagService,
    private certificateService: CertificateService
    ) { }

  ngOnInit(): void {
    this.tagService.getTags(1, 6).subscribe(data => {
      this.tags = data;
    });
  }

  onTagClick(targetTag: Tag): void {
    console.log('search by tag... ' + targetTag.name);
    this.certificateService.searchCertificatesByTag(targetTag.name);
  }
}
