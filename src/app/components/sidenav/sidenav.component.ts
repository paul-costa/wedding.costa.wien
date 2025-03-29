import { Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { ContentComponent } from 'src/app/constants/shared-interfaces';
import { BreakpointObserverService } from 'src/app/services/breakpoint-observer.service';
import { AppRoutingModule } from 'src/modules/app-routing.module';
import { ContentComponents } from '../../constants/app.constants';

const materialModules = [MatIconModule, MatButtonModule];

@Component({
  selector: 'app-sidenav',
  imports: [BrowserModule, AppRoutingModule, ...materialModules],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnDestroy {
  @Input()
  currentContentComponent?: ContentComponent;

  @Output()
  accountButtonClicked = new EventEmitter<void>();

  sidenavHidden?: boolean;
  isXs = false;

  readonly contentComponents: ContentComponent[] = Object.values(ContentComponents);

  private readonly breakpointObserverService = inject(BreakpointObserverService);
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.breakpointObserverService
      .observeIsXs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isXs) => {
        this.toggleSideNav(isXs);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleSidenavClick(toggle: boolean) {
    if (this.breakpointObserverService.isXs) {
      return;
    }

    this.toggleSideNav(toggle);
  }

  onAccountButtonClick() {
    this.accountButtonClicked.emit();
  }

  private toggleSideNav(toggle: boolean) {
    this.sidenavHidden = toggle;

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 150);
  }
}
