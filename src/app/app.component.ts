import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarLink, NavbarLinks, NavLinks } from './constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wedding.costa.wien';

  activeNav?: NavbarLink;

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url.slice(1);
        this.activeNav = !url ? NavbarLinks[NavLinks.Home] : Object.values(NavbarLinks).find((v) => v.url === url);
      }
    });
  }
}
