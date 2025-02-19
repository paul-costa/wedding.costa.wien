import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Homepage } from 'src/app/constants/fire-store.types';
import { FireStoreService } from 'src/app/services/fire-store.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const materialModules = [MatInputModule, MatButtonModule, MatIconModule];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  homePageData?: Homepage[];

  private readonly fireStoreService = inject(FireStoreService);

  ngOnInit() {
    this.fireStoreService.getHomePageData().then((data) => {
      this.homePageData = data;
    });
  }

  onSendMessageButtonClick(message: string) {
    console.log(message);
  }
}
