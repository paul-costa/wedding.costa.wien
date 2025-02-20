import { DocumentReference } from 'firebase/firestore/lite';

export const HomePageCollectionName = 'homepage';
export const GuestsCollectionName = 'guests';

export interface Homepage {
  introText?: string;
  guests?: DocumentReference[];
}

export interface Guest {
  firstName?: string;
  lastName?: string;
  id?: string;
  role?: string;
}

export interface Message {
  id: string;
  value: string;
  timestamp: Date;
  isAdminMessage?: boolean;
}
