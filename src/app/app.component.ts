import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GuestsDialogComponent } from './components/content/guests-dialog/guests-dialog.component';
import { ContentComponents } from './constants/app.constants';
import { Content, DefaultSnackbarConfig, LocalStorageKeys } from './constants/shared-constants';
import { ContentComponent, GuestsDialogCloseConfig } from './constants/shared-interfaces';
import { FireStoreService } from './services/fire-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'wedding.costa.wien';
  currentContentComponent?: ContentComponent;

  private readonly destroy$ = new Subject<void>();
  private readonly fireStoreService = inject(FireStoreService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  private readonly _snackBar = inject(MatSnackBar);

  constructor() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url.slice(1);
        this.currentContentComponent = !url ? ContentComponents[Content.Home] : Object.values(ContentComponents).find((v) => v.url === url);
      }
    });
  }

  ngOnInit() {
    const submittedGuestId = localStorage.getItem(LocalStorageKeys.SubmittedGuestId);

    if (!submittedGuestId) {
      this.initAccountDialog();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAccountButtonClicked() {
    this.initAccountDialog();
  }

  private initAccountDialog() {
    this.fireStoreService.getAccountDialog().then((config) => {
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
            this.fireStoreService.setGuest(guestsDialogCloseConfig).then(() => {
              this._snackBar.open(config.accountDialog.guestSubmittedMessage, null, DefaultSnackbarConfig);
              localStorage.setItem(LocalStorageKeys.SubmittedGuestId, guestsDialogCloseConfig.selectedGuest?.id);
            });
          }
        });
    });
  }
}
