import { Type } from '@angular/core';
import { DosAndDontsComponent } from '../components/content/dos-and-donts/dos-and-donts.component';
import { DresscodeComponent } from '../components/content/dresscode/dresscode.component';
import { GalleryComponent } from '../components/content/gallery/gallery.component';
import { GiftsComponent } from '../components/content/gifts/gifts.component';
import { HomeComponent } from '../components/content/home/home.component';
import { LocationJourneyComponent } from '../components/content/location-journey/location-journey.component';
import { TimetableComponent } from '../components/content/timetable/timetable.component';
import { AccountDialog, Guest } from './fire-store.types';

export interface GuestsDialogCloseConfig {
  selectedGuest?: Guest;
  isGuestShowingUp?: boolean;
}

export interface AccountDialogConfig {
  guests?: Guest[];
  accountDialog?: AccountDialog;
}

type ContentComponents =
  | HomeComponent
  | LocationJourneyComponent
  | TimetableComponent
  | DresscodeComponent
  | DosAndDontsComponent
  | GiftsComponent
  | GalleryComponent;

export interface ContentComponent {
  url?: string;
  icon?: string;
  title?: string;
  component?: Type<ContentComponents>;
}
