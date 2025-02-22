import { Guest } from './fire-store.types';

export interface GuestsDialogConfig {
  guests?: Guest[];
}

export interface GuestsDialogContent {
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

export interface HomePageContent {
  messagesHeaderLabel?: string;
  messagesLoadingErrorLabel?: string;
  messagesInputHeaderLabel?: string;
  messagesInputInvalidLabel?: string;
}

export interface GuestsDialogCloseConfig {
  selectedGuest?: Guest;
  isGuestShowingUp?: boolean;
}

export enum LoadingState {
  None,
  Loading,
  Error,
  Success,
}
