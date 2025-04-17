import { Type } from '@angular/core';
import { DosDontsComponent } from '../components/content/dos-donts/dos-donts.component';
import { DresscodeComponent } from '../components/content/dresscode/dresscode.component';
import { GalleryComponent } from '../components/content/gallery/gallery.component';
import { GiftsComponent } from '../components/content/gifts/gifts.component';
import { HomeComponent } from '../components/content/home/home.component';
import { LocationJourneyComponent } from '../components/content/location-journey/location-journey.component';
import { TimetableComponent } from '../components/content/timetable/timetable.component';
import { AccountDialog, Guest, Hyperlink } from './fire-store.types';

export enum LoadingState {
  None,
  Loading,
  Error,
  Success,
}

export interface GuestsDialogCloseConfig {
  selectedGuest?: Guest;
  isGuestShowingUp?: boolean;
}

export interface AccountDialogConfig {
  guests?: Guest[];
  accountDialog?: AccountDialog;
}

export enum Content {
  Home,
  LocationJourney,
  Timetable,
  Dresscode,
  DosDonts,
  Gifts,
  Gallery,
}

type ContentComponents =
  | HomeComponent
  | LocationJourneyComponent
  | TimetableComponent
  | DresscodeComponent
  | DosDontsComponent
  | GiftsComponent
  | GalleryComponent;

export interface ContentComponent {
  url?: string;
  icon?: string;
  title?: string;
  component?: Type<ContentComponents>;
}

export const MatIcons = ['public', 'location_on', 'download'];

export const OnOpenUrl = (link: Hyperlink, target: '_blank' | '_parent' | '_self' | '_top' | 'URL' | 'name' = '_blank') => {
  if (link?.linkUrl == null) {
    return;
  }

  window.open(link.linkUrl, target);
};
