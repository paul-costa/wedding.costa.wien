import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, finalize, from } from 'rxjs';
import { DressCode } from 'src/app/constants/fire-store.types';
import { LoadingState } from 'src/app/constants/shared-interfaces';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ContentBlock } from '../../shared/content-block.component';

const materialModules = [MatProgressBarModule];
@Component({
  selector: 'app-dress-code',
  imports: [AsyncPipe, ContentBlock, NgTemplateOutlet, ...materialModules],
  templateUrl: './dress-code.component.html',
  styleUrl: './dress-code.component.scss',
})
export class DressCodeComponent {
  currentLoadingState = LoadingState.None;

  readonly $dressCodeData: Observable<DressCode>;
  readonly LoadingState = LoadingState;

  // TODO: add all images
  readonly imagesSrc = {
    women: [
      [
        '/assets/images/dress-code/women/do1.jpg',
        '/assets/images/dress-code/women/do2.jpg',
        '/assets/images/dress-code/women/do3.jpg',
        '/assets/images/dress-code/women/do4.jpg',
        '/assets/images/dress-code/women/do5.jpg',
        '/assets/images/dress-code/women/do6.jpg',
      ],
      [
        '/assets/images/dress-code/women/dont1.jpg',
        '/assets/images/dress-code/women/dont2.jpg',
        '/assets/images/dress-code/women/dont3.jpg',
        '/assets/images/dress-code/women/dont4.jpg',
        '/assets/images/dress-code/women/dont5.jpg',
        '/assets/images/dress-code/women/dont6.jpg',
      ],
    ],
    men: [
      [
        '/assets/images/dress-code/men/do1.jpg',
        '/assets/images/dress-code/men/do2.jpg',
        '/assets/images/dress-code/men/do3.jpg',
        '/assets/images/dress-code/men/do4.jpg',
      ],
      [
        '/assets/images/dress-code/men/dont1.jpg',
        '/assets/images/dress-code/men/dont2.jpg',
        '/assets/images/dress-code/men/dont3.jpg',
        '/assets/images/dress-code/men/dont4.jpg',
      ],
    ],
  };

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.currentLoadingState = LoadingState.Loading;
    this.$dressCodeData = from(this.fireStoreService.getDressCodeData()).pipe(
      finalize(() => {
        this.currentLoadingState = LoadingState.Success;
      }),
    );
  }
}
