import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentBlock } from 'src/app/components/shared/content-block/content-block.component';
import { Messages, UserMessage } from 'src/app/constants/fire-store.types';
import { LoadingState } from 'src/app/constants/shared-interfaces';
import { FireStoreService } from 'src/app/services/fire-store.service';

const materialModules = [MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  imports: [NgClass, ReactiveFormsModule, DatePipe, ContentBlock, ...materialModules],
})
export class MessagesComponent {
  @Input()
  config: Messages;

  currentUserMessage = new FormControl<string>('', [Validators.required]);
  currentUserMessagesLoadingState = LoadingState.None;
  userMessages: UserMessage[] = [];

  readonly LoadingState = LoadingState;

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.fetchAndSetUserMessages();
  }

  onSendUserMessageButtonClick() {
    this.currentUserMessage.markAsTouched();

    if (this.currentUserMessage.invalid) {
      return;
    }

    this.currentUserMessagesLoadingState = LoadingState.Loading;

    const userMessage: UserMessage = {
      id: crypto.randomUUID(),
      value: this.currentUserMessage.value,
      date: new Date(),
    };

    this.fireStoreService.sendUserMessage(userMessage).then((res) => {
      if (res) {
        this.currentUserMessage.reset();
        this.fetchAndSetUserMessages();
        return;
      }

      this.currentUserMessagesLoadingState = LoadingState.Error;
    });
  }

  private fetchAndSetUserMessages() {
    this.currentUserMessagesLoadingState = LoadingState.Loading;

    this.fireStoreService
      .getUserMessages()
      .catch((err) => {
        this.currentUserMessagesLoadingState = LoadingState.Error;
        console.error(err);
        return [] as UserMessage[];
      })
      .then((userMessages) => {
        this.userMessages = userMessages.reverse();
        this.currentUserMessagesLoadingState = LoadingState.Success;
      });
  }
}
