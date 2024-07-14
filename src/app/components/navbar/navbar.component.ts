import { Component } from '@angular/core';

export interface NavbarLink {
  url?: string;
  icon?: string;
  title?: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly navbarLinks: NavbarLink[] = [
    {
      title: 'Homepage',
      url: 'home',
      icon: 'home',
    },
    {
      title: 'Location & Anreise',
      url: 'location',
      icon: 'location_on',
    },
    {
      title: 'Ablauf',
      url: 'timetable',
      icon: 'schedule',
    },
    {
      title: 'Dresscode',
      url: 'dresscode',
      icon: 'person_check',
    },
    {
      title: "Do's & Don'ts",
      url: 'dos-donts',
      icon: 'rule',
    },
    {
      title: 'Geschenke',
      url: 'gift',
      icon: 'redeem',
    },
    {
      title: 'Galerie (Fotos)',
      url: 'gallery',
      icon: 'camera',
    },
  ];
}
