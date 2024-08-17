import { DocumentReference } from 'firebase/firestore/lite';

export const HomePageCollectionName = 'homepage';

export interface Homepage {
  introText?: string;
  guests?: DocumentReference[];
}
