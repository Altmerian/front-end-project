import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Tag } from 'src/app/models/tag'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input('category-figure') tag: Tag;

  constructor(private elRef:ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let div = this.elRef.nativeElement.querySelector('.category-figure');
    setTimeout(function () {
      div.style.opacity = 1;
    }, 500);
  }
}
