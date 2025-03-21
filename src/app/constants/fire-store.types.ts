import { DocumentReference } from 'firebase/firestore/lite';

export const DressCodeCollectionName = 'dresscode';
export const GuestsCollectionName = 'guests';
export const AccountDialogCollectionName = 'accountDialog';
export const MessagesCollectionName = 'messages';
export const HomePageCollectionName = 'homepage';

export interface Homepage {
  introText?: string;
  guests?: DocumentReference[];
  summaryHeaderText?: string;
  summaryBodyText?: string[];
  accountHeaderText?: string;
  accountBodyText?: string[];
  dateEventHeaderText?: string;
  dateEventBodyText?: string;
  dateEventButtonText?: string;
  contactsHeaderText?: string;
  contactsBodyText?: string;
  contacts?: Contact[];
}

export interface AccountDialogConfig {
  guests?: Guest[];
  accountDialogContent?: AccountDialogContent;
}

export interface AccountDialogContent {
  header?: string;
  subHeader?: string;
  guestSelectLabel?: string;
  disclaimer?: string;
  disabledGuestHint?: string;
  isShowingUpLabel?: string;
  isNotShowingUpLabel?: string;
  actionCancelLabel?: string;
  actionConfirmLabel?: string;
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

export interface DressCode {
  summaryHeaderText?: string;
  summaryBodyTexts?: string[];
  womenHeaderText?: string;
  women?: ContentBlockHeaderAndList[];
  menHeaderText?: string;
  men?: ContentBlockHeaderAndList[];
}

export interface ContentBlockHeaderAndList {
  header: string;
  content: string[];
}
