import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize, from, Observable } from 'rxjs';
import { Homepage } from 'src/app/constants/fire-store.types';
import { LoadingState } from 'src/app/constants/shared-interfaces';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { MessagesComponent } from './messages/messages.component';

const materialModules = [MatButtonModule, MatIconModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MessagesComponent, ...materialModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  currentLoadingState = LoadingState.None;

  readonly homePageData$: Observable<Homepage>;
  readonly LoadingState = LoadingState;

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.currentLoadingState = LoadingState.Loading;
    this.homePageData$ = from(this.fireStoreService.getHomePageData()).pipe(
      finalize(() => {
        this.currentLoadingState = LoadingState.Success;
      }),
    );
  }
}
