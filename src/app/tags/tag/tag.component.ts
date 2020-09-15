import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, AfterViewInit {
  @Input('category-figure') tag: Tag;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = this.elRef.nativeElement.querySelector('.category-figure');
    setTimeout(() => {
      div.style.opacity = 1;
    }, 500);
  }
}
