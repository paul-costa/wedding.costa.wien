import { Type } from '@angular/core';
import { DosDontsComponent } from '../components/content/dos-donts/dos-donts.component';
import { DressCodeComponent } from '../components/content/dress-code/dress-code.component';
import { GalleryComponent } from '../components/content/gallery/gallery.component';
import { GiftsComponent } from '../components/content/gifts/gifts.component';
import { HomeComponent } from '../components/content/home/home.component';
import { LocationComponent } from '../components/content/location/location.component';
import { TimetableComponent } from '../components/content/timetable/timetable.component';

export enum Content {
  Home,
  Location,
  Timetable,
  DressCode,
  DosDonts,
  Gifts,
  Gallery,
}

type ContentComponents =
  | HomeComponent
  | LocationComponent
  | TimetableComponent
  | DressCodeComponent
  | DosDontsComponent
  | GiftsComponent
  | GalleryComponent;

export interface ContentComponent {
  url?: string;
  icon?: string;
  title?: string;
  component?: Type<ContentComponents>;
}

export const ContentComponents: Record<Content, ContentComponent> = {
  [Content.Home]: {
    title: 'Homepage',
    icon: 'home',
    url: 'home',
    component: HomeComponent,
  },
  [Content.Location]: {
    title: 'Location & Anreise',
    url: 'location',
    icon: 'location_on',
    component: LocationComponent,
  },
  [Content.Timetable]: {
    title: 'Ablauf',
    url: 'timetable',
    icon: 'schedule',
    component: TimetableComponent,
  },
  [Content.DressCode]: {
    title: 'Dresscode',
    url: 'dresscode',
    icon: 'person_check',
    component: DressCodeComponent,
  },
  [Content.DosDonts]: {
    title: "Do's & Don'ts",
    url: 'dos-donts',
    icon: 'rule',
    component: DosDontsComponent,
  },
  [Content.Gifts]: {
    title: 'Geschenke',
    url: 'gifts',
    icon: 'redeem',
    component: GiftsComponent,
  },
  [Content.Gallery]: {
    title: 'Galerie (Fotos)',
    url: 'gallery',
    icon: 'camera',
    component: GalleryComponent,
  },
};
