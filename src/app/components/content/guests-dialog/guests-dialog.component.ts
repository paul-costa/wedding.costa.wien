import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AccountDialog, Guest } from 'src/app/constants/fire-store.types';
import { AccountDialogConfig, GuestsDialogCloseConfig } from 'src/app/constants/shared-interfaces';

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
  readonly content: AccountDialog;

  private readonly config: AccountDialogConfig = inject(MAT_DIALOG_DATA);
  private readonly dialogRef: MatDialogRef<GuestsDialogComponent> = inject(MatDialogRef);

  constructor() {
    this.guests = this.config.guests;
    this.content = this.config.accountDialog;
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
