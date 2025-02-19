import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Homepage } from 'src/app/constants/fire-store.types';
import { FireStoreService } from 'src/app/services/fire-store.service';

const materialModules = [MatInputModule, MatButtonModule, MatIconModule];

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ...materialModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  homePageData?: Homepage[];
  currentMessage = '';

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.fireStoreService.getHomePageData().then((data) => {
      this.homePageData = data;
    });
  }

  onSendMessageButtonClick() {
    console.log(this.currentMessage);
    this.currentMessage = '';
  }
}
