import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseConfig } from 'src/config/firebase.config';
import {
  AccountDialogCollectionName,
  AccountDialogConfig,
  DressCode,
  DressCodeCollectionName,
  GuestsCollectionName,
  Homepage,
  HomePageCollectionName,
  Message,
  MessagesCollectionName,
} from '../constants/fire-store.types';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  private readonly app = initializeApp(firebaseConfig);
  private readonly db = getFirestore(this.app);

  async getHomePageData(): Promise<Homepage> {
    const col = collection(this.db, HomePageCollectionName);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }

  async getAccountDialogData(): Promise<AccountDialogConfig> {
    const guests = collection(this.db, GuestsCollectionName);
    const guestsSnapshot = await getDocs(guests);

    const accountDialog = collection(this.db, AccountDialogCollectionName);
    const accountSnapshot = await getDocs(accountDialog);

    return {
      guests: guestsSnapshot.docs.map((d) => d.data()),
      accountDialogContent: accountSnapshot.docs.map((d) => d.data())[0],
    };
  }

  async getMessages(): Promise<Message[]> {
    const col = collection(this.db, MessagesCollectionName);
    const snapshot = await getDocs(col);
    return snapshot.docs
      .map((d) => d.data() as Message)
      .map((d) => ({ ...d, date: new Date(d.date['seconds'] * 1000) }))
      .sort((mA, mB) => mA.date.getTime() - mB.date.getTime());
  }

  async sendMessage(message: Message) {
    const docRef = doc(this.db, 'messages', message.id);

    return new Promise((resolve) => {
      setDoc(docRef, message).then(() => resolve(true));
    });
  }

  async getDressCodeData(): Promise<DressCode> {
    const col = collection(this.db, DressCodeCollectionName);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((d) => d.data())[0];
  }
}
