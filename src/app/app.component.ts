import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GuestsDialogComponent } from './components/content/guests-dialog/guests-dialog.component';
import { Content, ContentComponent, ContentComponents } from './constants/app.constants';
import { Guest } from './constants/fire-store.types';
import { GuestsDialogCloseConfig, GuestsDialogConfig as GuestsDialogData } from './constants/shared-interfaces';
import { FireStoreService } from './services/fire-store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'wedding.costa.wien';
  currentContentComponent?: ContentComponent;

  private readonly fireStoreService = inject(FireStoreService);
  private readonly destroy$ = new Subject<void>();
  private readonly dialog = inject(MatDialog);

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.url.slice(1);
        this.currentContentComponent = !url ? ContentComponents[Content.Home] : Object.values(ContentComponents).find((v) => v.url === url);
      }
    });
  }

  ngOnInit() {
    this.fireStoreService.getGuestsData().then((data) => {
      // this.initGuestsDialog(data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initGuestsDialog(guests: Guest[]) {
    const dialogRef = this.dialog.open(GuestsDialogComponent, {
      width: '600px',
      data: { guests } as GuestsDialogData,
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
  }
}
