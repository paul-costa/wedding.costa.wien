import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { from, Observable } from 'rxjs';
import { Homepage, Message } from 'src/app/constants/fire-store.types';
import { HomePageContent, LoadingState } from 'src/app/constants/shared-interfaces';
import { FireStoreService } from 'src/app/services/fire-store.service';

const materialModules = [MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule];
@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, NgIf, ...materialModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  currentMessage = new FormControl<string>('', [Validators.required]);

  currentMessagesLoadingState = LoadingState.None;
  messages: Message[] = [];

  readonly homePageData$: Observable<Homepage[]>;
  readonly LoadingState = LoadingState;
  readonly content: HomePageContent = {
    messagesHeaderLabel: 'Nachrichten',
    messagesLoadingErrorLabel: 'Nachrichten konnten nicht geladen werden!',
    messagesInputHeaderLabel: 'Nachricht',
    messagesInputInvalidLabel: 'Nachricht ist ein Pflichtfeld',
  };

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.homePageData$ = from(this.fireStoreService.getHomePageData());

    this.fetchAndSetMessages();
  }

  onSendMessageButtonClick() {
    this.currentMessage.markAsTouched();

    if (this.currentMessage.invalid) {
      return;
    }

    this.currentMessagesLoadingState = LoadingState.Loading;

    const message: Message = {
      id: crypto.randomUUID(),
      value: this.currentMessage.value,
      date: new Date(),
    };

    this.fireStoreService.sendMessage(message).then((res) => {
      if (res) {
        this.currentMessage.reset();
        this.fetchAndSetMessages();
        return;
      }

      this.currentMessagesLoadingState = LoadingState.Error;
    });
  }

  private fetchAndSetMessages() {
    this.currentMessagesLoadingState = LoadingState.Loading;

    this.fireStoreService
      .getMessages()
      .catch((err) => {
        this.currentMessagesLoadingState = LoadingState.Error;
        console.error(err);
        return [] as Message[];
      })
      .then((res) => {
        this.messages = res;
        this.currentMessagesLoadingState = LoadingState.Success;
      });
  }
}
