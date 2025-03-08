import { DocumentReference } from 'firebase/firestore/lite';

export const HomePageCollectionName = 'homepage';
export const GuestsCollectionName = 'guests';
export const MessagesCollectionName = 'messages';

export interface Homepage {
  introText?: string;
  guests?: DocumentReference[];
  summaryHeaderText?: string;
  summaryBodyText?: string[];
  dateEventHeaderText?: string;
  dateEventBodyText?: string;
  dateEventButtonText?: string;
  contactsHeaderText?: string;
  contactsBodyText?: string;
  contacts?: Contact[];
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
  date: Date;
  isAdminMessage?: boolean;
}

export interface Contact {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
