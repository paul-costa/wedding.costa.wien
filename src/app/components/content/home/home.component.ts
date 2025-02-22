import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Homepage } from 'src/app/constants/fire-store.types';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { MessagesComponent } from './messages/messages.component';
@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MessagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly homePageData$: Observable<Homepage[]>;

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.homePageData$ = from(this.fireStoreService.getHomePageData());
  }
}
