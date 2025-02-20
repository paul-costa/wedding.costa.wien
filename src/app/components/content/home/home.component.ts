import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Homepage, Message } from 'src/app/constants/fire-store.types';
import { FireStoreService } from 'src/app/services/fire-store.service';

const materialModules = [MatInputModule, MatButtonModule, MatIconModule];

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, NgIf, ...materialModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  homePageData?: Homepage[];
  currentMessage = new FormControl<string>('', [Validators.required]);

  messages: Message[];

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.fireStoreService.getHomePageData().then((data) => {
      this.homePageData = data;
    });

    // TODO: import messages from storage
    this.messages = [
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
      { id: 'id1', timestamp: new Date(2025, 1, 1), value: 'Erste Nachricht' },
      { id: 'id2', timestamp: new Date(2025, 2, 1), value: 'Zweite Nachricht (Admin)', isAdminMessage: true },
    ];
  }

  onSendMessageButtonClick() {
    this.currentMessage.markAsTouched();

    if (this.currentMessage.invalid) {
      return;
    }

    const msg = this.currentMessage.value;
    this.currentMessage.reset();
  }
}
