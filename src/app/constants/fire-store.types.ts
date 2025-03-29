import { DocumentReference } from 'firebase/firestore/lite';
import {} from './shared-interfaces';

export const DresscodeCollection = 'dresscode';
export const GuestsCollection = 'guests';
export const AccountDialogCollection = 'accountDialog';
export const UserMessagesCollection = 'userMessages';
export const HomepageCollection = 'homepage';
export const MessagesCollection = 'messages';

export interface AccountDialog {
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

export interface Messages {
  messagesHeaderLabel?: string;
  messagesLoadingErrorLabel?: string;
  messagesInputHeaderLabel?: string;
  messagesInputInvalidLabel?: string;
}

export interface UserMessage {
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

export interface Dresscode {
  summaryHeaderText?: string;
  summaryBodyTexts?: string[];
  summaryBodyLinks?: BodyLink[];
  womenHeaderText?: string;
  womenBodyTexts?: string[];
  women?: ContentBlockHeaderAndList[];
  menHeaderText?: string;
  men?: ContentBlockHeaderAndList[];
  menBodyTexts?: string[];
}

export interface ContentBlockHeaderAndList {
  header: string;
  content: string[];
}

export interface BodyLink {
  linkText: string;
  linkUrl: string;
}
