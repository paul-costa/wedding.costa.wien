import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarLink, NavbarLinks } from './constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wedding.costa.wien';
  activeNav?: NavbarLink;

  private readonly router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url.slice(1);
        this.activeNav = Object.values(NavbarLinks).find((v) => v.url === url);
      }
    });
  }
}
