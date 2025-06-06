import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { environment } from 'src/config/environment.config';
import {
  AccountDialogCollection,
  DoesAndDonts,
  DosAndDontsCollection,
  Dresscode,
  DresscodeCollection,
  Gallery,
  GalleryCollection,
  Gifts,
  GiftsCollection,
  GuestsCollection,
  Homepage,
  HomepageCollection,
  LocationCollection,
  LocationJourney,
  Messages,
  MessagesCollection,
  Timetable,
  TimetableCollection,
  UserMessage,
  UserMessagesCollection,
} from '../constants/fire-store.types';
import { AccountDialogConfig, GuestsDialogCloseConfig } from '../constants/shared-interfaces';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  private readonly app = initializeApp(environment.firebase);
  private readonly db = getFirestore(this.app);

  async getAccountDialog(): Promise<AccountDialogConfig> {
    const guests = collection(this.db, GuestsCollection);
    const guestsSnapshot = await getDocs(guests);

    const accountDialog = collection(this.db, AccountDialogCollection);
    const accountSnapshot = await getDocs(accountDialog);

    return {
      guests: guestsSnapshot.docs.map((d) => d.data()),
      accountDialog: accountSnapshot.docs.map((d) => d.data())[0],
    };
  }

  async setGuest(guestsDialogCloseConfig: GuestsDialogCloseConfig): Promise<boolean> {
    const docRef = doc(this.db, GuestsCollection, guestsDialogCloseConfig.selectedGuest.id);

    return new Promise((resolve) => {
      setDoc(docRef, { ...guestsDialogCloseConfig.selectedGuest, isGuestShowingUp: guestsDialogCloseConfig.isGuestShowingUp }).then(() =>
        resolve(true),
      );
    });
  }

  async getHomepage(): Promise<Homepage> {
    const col = collection(this.db, HomepageCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }

  async getMessages(): Promise<Messages> {
    const col = collection(this.db, MessagesCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }

  async getUserMessages(): Promise<UserMessage[]> {
    const col = collection(this.db, UserMessagesCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs
      .map((d) => d.data() as UserMessage)
      .map((d) => ({ ...d, date: new Date(d.date['seconds'] * 1000) }))
      .sort((mA, mB) => mA.date.getTime() - mB.date.getTime());
  }

  async sendUserMessage(message: UserMessage): Promise<boolean> {
    const docRef = doc(this.db, UserMessagesCollection, message.id);

    return new Promise((resolve) => {
      setDoc(docRef, message).then(() => resolve(true));
    });
  }

  async getDresscode(): Promise<Dresscode> {
    const col = collection(this.db, DresscodeCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }

  async getLocationJourney(): Promise<LocationJourney> {
    const col = collection(this.db, LocationCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs
      .map((res) => {
        const id = res.data()?.id;
        const resData = res.data();
        delete resData.id;
        return { [id]: resData };
      })
      .reduce((f1, f2) => ({ ...f1, ...f2 }), {});
  }

  async getDosAndDonts(): Promise<DoesAndDonts> {
    const col = collection(this.db, DosAndDontsCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }

  async getTimetable(): Promise<Timetable> {
    const col = collection(this.db, TimetableCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }

  async getGifts(): Promise<Gifts> {
    const col = collection(this.db, GiftsCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }

  async getGallery(): Promise<Gallery> {
    const col = collection(this.db, GalleryCollection);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }
}
