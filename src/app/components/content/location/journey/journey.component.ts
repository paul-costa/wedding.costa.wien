import { Component, Input } from '@angular/core';
import { Journey } from 'src/app/constants/fire-store.types';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent {
  @Input()
  config: Journey;
}
