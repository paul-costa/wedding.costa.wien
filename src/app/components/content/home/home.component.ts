import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Homepage } from 'src/app/constants/fire-store.types';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
}
