import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize, from, Observable } from 'rxjs';
import { LocationJourney } from 'src/app/constants/fire-store.types';
import { LoadingState, MatIcons, OnOpenUrl as onOpenLink } from 'src/app/constants/shared-interfaces';
import { UserAddressPipe } from 'src/app/pipes/user-address.pipe';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ContentBlock } from '../../shared/content-block/content-block.component';
import { JourneyComponent } from './journey/journey.component';

const materialModules = [MatProgressBarModule, MatButtonModule, MatCardModule, MatIcon];

@Component({
  selector: 'app-location',
  imports: [AsyncPipe, ContentBlock, JourneyComponent, UserAddressPipe, NgTemplateOutlet, ...materialModules],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  currentLoadingState = LoadingState.None;

  readonly $locationJourney: Observable<LocationJourney>;
  readonly LoadingState = LoadingState;

  readonly imageSrc = {
    googleMaps: '/assets/images/location/googlemaps.jpg',
    chadim: ['/assets/images/location/chadim1.jpg', '/assets/images/location/chadim2.jpg'],
    chadimLogo: '/assets/images/location/chadim-logo.jpg',
  };

  readonly MatIcons = MatIcons;
  readonly onOpenLink = onOpenLink;

  private readonly fireStoreService = inject(FireStoreService);

  constructor() {
    this.currentLoadingState = LoadingState.Loading;
    this.$locationJourney = from(this.fireStoreService.getLocationJourney()).pipe(
      finalize(() => {
        this.currentLoadingState = LoadingState.Success;
      }),
    );
  }
}
