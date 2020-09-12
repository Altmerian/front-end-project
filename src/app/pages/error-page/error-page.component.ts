import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  status = 404;
  text = 'Page not found';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.status = state.status;
      this.text = state.text;
    }
   }

  ngOnInit(): void {
  }
}
