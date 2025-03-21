import { Component, inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GuestsDialogComponent } from './components/content/guests-dialog/guests-dialog.component';
import { Content, ContentComponent, ContentComponents } from './constants/app.constants';
import { GuestsDialogCloseConfig } from './constants/shared-interfaces';
import { FireStoreService } from './services/fire-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnDestroy {
  title = 'wedding.costa.wien';
  currentContentComponent?: ContentComponent;

  private readonly destroy$ = new Subject<void>();
  private readonly fireStoreService = inject(FireStoreService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url.slice(1);
        this.currentContentComponent = !url ? ContentComponents[Content.Home] : Object.values(ContentComponents).find((v) => v.url === url);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAccountButtonClicked() {
    this.initAccountDialog();
  }

  private initAccountDialog() {
    this.fireStoreService.getAccountDialogData().then((config) => {
      const dialogRef = this.dialog.open(GuestsDialogComponent, {
        width: '800px',
        data: config,
        disableClose: true,
      });

      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe((guestsDialogCloseConfig: GuestsDialogCloseConfig) => {
          if (guestsDialogCloseConfig) {
            // TODO: send close config data to BE
          }
        });
    });
  }
}
