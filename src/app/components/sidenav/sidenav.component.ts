import { Component, inject, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserverService } from 'src/app/services/breakpoint-observer.service';
import { AppRoutingModule } from 'src/modules/app-routing.module';
import { ContentComponent, ContentComponents } from '../../constants/app.constants';


const materialModules = [MatIconModule, MatButtonModule]

@Component({
    selector: 'app-sidenav',
    imports: [BrowserModule, AppRoutingModule, ...materialModules],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnDestroy {
  @Input()
  currentContentComponent?: ContentComponent;

  sidenavHidden?: boolean;

  readonly contentComponents: ContentComponent[] = Object.values(ContentComponents);

  private readonly breakpointObserverService = inject(BreakpointObserverService);
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.breakpointObserverService
      .observeIsBreakpointXs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isBreakpointXs) => {
        this.onToggleSidenavClick(isBreakpointXs);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleSidenavClick(toggle: boolean) {
    this.sidenavHidden = toggle;
    window.dispatchEvent(new Event('resize'));
  }
}
