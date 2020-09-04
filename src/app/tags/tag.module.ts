import { NgModule } from '@angular/core';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagComponent } from './tag/tag.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TagsListComponent,
    TagComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    TagsListComponent,
  ]
})
export class TagModule { }
