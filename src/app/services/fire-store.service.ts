import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseConfig } from 'src/config/firebase.config';
import {
  AccountDialogCollection,
  Dresscode,
  DresscodeCollection,
  GuestsCollection,
  Homepage,
  HomepageCollection,
  LocationCollection,
  LocationJourney,
  Messages,
  MessagesCollection,
  UserMessage,
  UserMessagesCollection,
} from '../constants/fire-store.types';
import { AccountDialogConfig } from '../constants/shared-interfaces';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  private readonly app = initializeApp(firebaseConfig);
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

  async sendUserMessage(message: UserMessage) {
    const docRef = doc(this.db, 'messages', message.id);

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
}
