export enum NavLinks {
  Home = 'home',
  Location = 'location',
  Timetable = 'timetable',
  Dresscode = 'dresscode',
  DosDonts = 'dos-donts',
  Gifts = 'gifts',
  Gallery = 'gallery',
}

export interface NavbarLink {
  url?: string;
  icon?: string;
  title?: string;
}

export const NavbarLinks: Record<string, NavbarLink> = {
  [NavLinks.Home]: {
    title: 'Homepage',
    url: NavLinks.Home,
    icon: 'home',
  },
  [NavLinks.Location]: {
    title: 'Location & Anreise',
    url: NavLinks.Location,
    icon: 'location_on',
  },
  [NavLinks.Timetable]: {
    title: 'Ablauf',
    url: NavLinks.Timetable,
    icon: 'schedule',
  },
  [NavLinks.Dresscode]: {
    title: 'Dresscode',
    url: NavLinks.Dresscode,
    icon: 'person_check',
  },
  [NavLinks.DosDonts]: {
    title: "Do's & Don'ts",
    url: NavLinks.DosDonts,
    icon: 'rule',
  },
  [NavLinks.Gifts]: {
    title: 'Geschenke',
    url: NavLinks.Gifts,
    icon: 'redeem',
  },
  [NavLinks.Gallery]: {
    title: 'Galerie (Fotos)',
    url: NavLinks.Gallery,
    icon: 'camera',
  },
};
