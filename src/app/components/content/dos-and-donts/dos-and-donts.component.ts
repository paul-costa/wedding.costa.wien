import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Observable, finalize, from } from 'rxjs';
import { DoesAndDonts } from 'src/app/constants/fire-store.types';
import { LoadingState } from 'src/app/constants/shared-constants';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ContentBlock } from '../../shared/content-block/content-block.component';

@Component({
  selector: 'app-dos-and-donts',
  imports: [MatProgressBar, ContentBlock, AsyncPipe],
  templateUrl: './dos-and-donts.component.html',
  styleUrl: './dos-and-donts.component.scss',
})
export class DosAndDontsComponent {
  currentLoadingState = LoadingState.None;

  readonly $dosAndDonts: Observable<DoesAndDonts>;
  readonly LoadingState = LoadingState;

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.currentLoadingState = LoadingState.Loading;
    this.$dosAndDonts = from(this.fireStoreService.getDosAndDonts()).pipe(
      finalize(() => {
        this.currentLoadingState = LoadingState.Success;
      }),
    );
  }
}
