import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/modules/app-routing.module';
import { ContentComponent, ContentComponents } from '../../constants/app.constants';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [BrowserModule, AppRoutingModule, MatIconModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input()
  currentContentComponent?: ContentComponent;

  sidenavHidden?: boolean;

  readonly contentComponents: ContentComponent[] = Object.values(ContentComponents);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
      this.toggleSidenav(state.matches);
    });
  }

  toggleSidenav(toggle: boolean) {
    this.sidenavHidden = toggle;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }
}
