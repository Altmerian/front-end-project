import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [
    TagsListComponent,
    TagComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TagsListComponent,
  ]
})
export class TagModule { }
