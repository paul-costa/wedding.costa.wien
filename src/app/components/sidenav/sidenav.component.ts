import { Component, EventEmitter, Output } from '@angular/core';
import { NavbarLink, NavbarLinks } from '../../constants/app.constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  sidenavHidden?: boolean;

  readonly links: NavbarLink[] = Object.values(NavbarLinks);

  toggleSidenav() {
    this.sidenavHidden = !this.sidenavHidden;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 500);
  }
}
