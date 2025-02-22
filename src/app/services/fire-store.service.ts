import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseConfig } from 'src/config/firebase.config';
import {
  Guest,
  GuestsCollectionName,
  Homepage,
  HomePageCollectionName,
  Message,
  MessagesCollectionName,
} from '../constants/fire-store.types';

import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  private readonly app = initializeApp(firebaseConfig);
  private readonly db = getFirestore(this.app);

  async getHomePageData(): Promise<Homepage[]> {
    const col = collection(this.db, HomePageCollectionName);
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map((d) => d.data());
    return list as Homepage[];
  }

  async getGuestsData(): Promise<Guest[]> {
    const col = collection(this.db, GuestsCollectionName);
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map((d) => d.data());
    return list as Guest[];
  }

  async getMessages(): Promise<Message[]> {
    const col = collection(this.db, MessagesCollectionName);
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map((d) => d.data());
    return (list as Message[])
      .map((d) => ({ ...d, date: new Date(d.date['seconds'] * 1000) }))
      .sort((mA, mB) => mA.date.getTime() - mB.date.getTime());
  }

  async sendMessage(message: Message) {
    const docRef = doc(this.db, 'messages', message.id);

    return new Promise((resolve) => {
      setDoc(docRef, message).then(() => resolve(true));
    });
  }
}
