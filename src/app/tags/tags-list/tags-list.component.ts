import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag';
import { TagService } from '../tag.service'

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: Tag[] = new Array<Tag>();
  TAGS_ON_PAGE: number = 6;

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.getTags(1, 6).subscribe(data => {
      this.tags = data['tags']
      console.log(this.tags);
    });
  }

  onTagClick(targetTag: Tag) {
    console.log('search by tag ' + targetTag.name)
  }
}
