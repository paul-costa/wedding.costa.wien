import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BodyLink } from 'src/app/constants/fire-store.types';

const materialModules = [MatButtonModule, MatIconModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-content-block',
  imports: [...materialModules],
  templateUrl: './content-block.component.html',
  styleUrl: './content-block.component.scss',
})
export class ContentBlock {
  @Input()
  headerText = '';

  @Input()
  bodyTexts: string[] = [];

  @Input()
  bodyLinks: BodyLink[] = [];
}
