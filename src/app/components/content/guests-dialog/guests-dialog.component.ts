import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AccountDialogConfig, AccountDialogContent, Guest } from 'src/app/constants/fire-store.types';
import { GuestsDialogCloseConfig } from 'src/app/constants/shared-interfaces';

const materialModules = [MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MatButtonModule];

@Component({
  selector: 'app-guests-dialog',
  imports: [NgIf, NgClass, NgFor, FormsModule, ...materialModules],
  templateUrl: './guests-dialog.component.html',
  styleUrl: './guests-dialog.component.scss',
})
export class GuestsDialogComponent {
  isGuestShowingUp: boolean;
  selectedGuest: Guest;

  readonly guests: Guest[];
  readonly content: AccountDialogContent;

  private readonly data: AccountDialogConfig = inject(MAT_DIALOG_DATA);
  private readonly dialogRef: MatDialogRef<GuestsDialogComponent> = inject(MatDialogRef);

  constructor() {
    this.guests = this.data.guests;
    this.content = this.data.accountDialogContent;
  }

  onCancelButtonClick() {
    this.dialogRef.close();
  }

  onConfirmButtonClick() {
    const guestsDialogCloseConfig: GuestsDialogCloseConfig = {
      selectedGuest: this.selectedGuest,
      isGuestShowingUp: this.isGuestShowingUp,
    };

    this.dialogRef.close(guestsDialogCloseConfig);
  }
}
