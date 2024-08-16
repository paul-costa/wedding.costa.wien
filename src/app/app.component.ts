import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Content, ContentComponent, ContentComponents } from './constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wedding.costa.wien';

  currentContentComponent?: ContentComponent;

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url.slice(1);
        this.currentContentComponent = !url ? ContentComponents[Content.Home] : Object.values(ContentComponents).find((v) => v.url === url);
      }
    });
  }
}
