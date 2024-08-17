import { Component, inject, OnInit } from '@angular/core';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly fireStoreService = inject(FireStoreService);

  ngOnInit() {
    this.fireStoreService.getHomePageData().then((data) => {
      console.log(data);
    });
  }
}
