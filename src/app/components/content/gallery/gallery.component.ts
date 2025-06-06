import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Observable, finalize, from } from 'rxjs';
import { Gallery } from 'src/app/constants/fire-store.types';
import { LoadingState } from 'src/app/constants/shared-constants';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ContentBlock } from '../../shared/content-block/content-block.component';

const materialModules = [MatProgressBar];
@Component({
  selector: 'app-gallery',
  imports: [ContentBlock, AsyncPipe, ...materialModules],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  currentLoadingState = LoadingState.None;

  readonly $gallery: Observable<Gallery>;
  readonly LoadingState = LoadingState;

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.currentLoadingState = LoadingState.Loading;

    this.$gallery = from(this.fireStoreService.getGallery()).pipe(
      finalize(() => {
        this.currentLoadingState = LoadingState.Success;
      }),
    );
  }
}
