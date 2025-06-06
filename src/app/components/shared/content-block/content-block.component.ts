import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Hyperlink } from 'src/app/constants/fire-store.types';

const materialModules = [MatButtonModule, MatIconModule, MatProgressSpinnerModule];

@Component({
  selector: 'app-content-block',
  imports: [NgClass, NgTemplateOutlet, ...materialModules],
  templateUrl: './content-block.component.html',
  styleUrl: './content-block.component.scss',
})
export class ContentBlock {
  @Input()
  headerText = '';

  @Input()
  bodyTexts: string[] = [];

  @Input()
  hyperLinks: Hyperlink[] = [];

  @Input()
  contentPosition: 'flex' | 'grid' | 'tab' = 'flex';

  @Input()
  additionalInfoCards: TemplateRef<HTMLElement>[];

  @Input()
  bodyTextStylePerIndex: Record<number, 'bold' | 'italic' | 'underline'>;
}
