import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore as getFireStore } from 'firebase/firestore/lite';
import { firebaseConfig } from 'src/config/firebase.config';
import { Guest, GuestsCollectionName, Homepage, HomePageCollectionName } from '../constants/fire-store.types';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  private readonly app = initializeApp(firebaseConfig);
  private readonly fireStoreDb = getFireStore(this.app);

  async getHomePageData(): Promise<Homepage[]> {
    const col = collection(this.fireStoreDb, HomePageCollectionName);
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map((d) => d.data());
    return list as Homepage[];
  }

  async getGuestsData(): Promise<Guest[]> {
    const col = collection(this.fireStoreDb, GuestsCollectionName);
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map((d) => d.data());
    return list as Guest[];
  }
}
