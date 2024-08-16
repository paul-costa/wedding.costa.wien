import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NavbarLink, NavbarLinks } from '../../constants/app.constants';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input()
  activeNav?: NavbarLink;

  sidenavHidden?: boolean;

  readonly links: NavbarLink[] = Object.values(NavbarLinks);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .subscribe((state: BreakpointState) => {
      this.toggleSidenav(!state.matches)
    });
  }

  toggleSidenav(toggle: boolean) {
    this.sidenavHidden = !toggle
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }
}
