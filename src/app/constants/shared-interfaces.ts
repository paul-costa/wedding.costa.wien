import { Guest } from './fire-store.types';

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
