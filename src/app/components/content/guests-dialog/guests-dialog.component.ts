import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Guest } from 'src/app/constants/fire-store.types';
import { GuestsDialogCloseConfig, GuestsDialogConfig, GuestsDialogContent } from 'src/app/constants/shared-interfaces';

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

  // TODO: fetch via firebase
  readonly content: GuestsDialogContent = {
    header: 'Gäste Verwaltung',
    subHeader: 'Bitte wähle deinen Namen aus der Liste aus, bestätige den Disclaimer und wähle ob du zur Hochzeit erscheinen kannst.',
    guestSelectLabel: 'Name (alphabetisch sortiert)',
    disclaimer: 'Jeder unserer Gäste hat direkt eine Einladung erhalten, es gibt keine +1 an die wir nicht schon gedacht haben.',
    disabledGuestHint:
      'Falls dein Name ausgegraut / deaktiviert ist, hast du uns schon eine Bestätigung geschickt. Falls du das nicht warst, kontaktiere uns bitte direkt (siehe Homepage)!',
    isShowingUpLabel: 'Ich werde zur Hochzeit erscheinen',
    isNotShowingUpLabel: 'Ich werde NICHT zur Hochzeit erscheinen',
    actionCancelLabel: 'Abbrechen',
    actionConfirmLabel: 'Absenden',
  };

  private readonly data: GuestsDialogConfig = inject(MAT_DIALOG_DATA);
  private readonly dialogRef: MatDialogRef<GuestsDialogComponent> = inject(MatDialogRef);

  constructor() {
    this.guests = this.data.guests;
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
