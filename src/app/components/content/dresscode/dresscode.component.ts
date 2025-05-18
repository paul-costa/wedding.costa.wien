import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, finalize, from } from 'rxjs';
import { Dresscode } from 'src/app/constants/fire-store.types';
import { LoadingState } from 'src/app/constants/shared-constants';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ContentBlock } from '../../shared/content-block/content-block.component';

const materialModules = [MatProgressBarModule];

@Component({
  selector: 'app-dresscode',
  imports: [AsyncPipe, ContentBlock, NgTemplateOutlet, ...materialModules],
  templateUrl: './dresscode.component.html',
  styleUrl: './dresscode.component.scss',
})
export class DresscodeComponent {
  currentLoadingState = LoadingState.None;

  readonly $dresscode: Observable<Dresscode>;
  readonly LoadingState = LoadingState;

  readonly imagesSrc = {
    women: [
      [
        '/assets/images/dresscode/women/do1.jpg',
        '/assets/images/dresscode/women/do2.jpg',
        '/assets/images/dresscode/women/do3.jpg',
        '/assets/images/dresscode/women/do4.jpg',
      ],
      [
        '/assets/images/dresscode/women/dont1.jpg',
        '/assets/images/dresscode/women/dont2.jpg',
        '/assets/images/dresscode/women/dont3.jpg',
        '/assets/images/dresscode/women/dont4.jpg',
      ],
    ],
    men: [
      [
        '/assets/images/dresscode/men/do1.jpg',
        '/assets/images/dresscode/men/do2.jpg',
        '/assets/images/dresscode/men/do3.jpg',
        '/assets/images/dresscode/men/do4.jpg',
      ],
      [
        '/assets/images/dresscode/men/dont1.jpg',
        '/assets/images/dresscode/men/dont2.jpg',
        '/assets/images/dresscode/men/dont3.jpg',
        '/assets/images/dresscode/men/dont4.jpg',
      ],
    ],
  };

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.currentLoadingState = LoadingState.Loading;
    this.$dresscode = from(this.fireStoreService.getDresscode()).pipe(
      finalize(() => {
        this.currentLoadingState = LoadingState.Success;
      }),
    );
  }
}
