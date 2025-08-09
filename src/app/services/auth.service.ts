import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { collection, doc, getDoc, setDoc } from '@firebase/firestore';
import { Users, usersConverter } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private collectionRef: CollectionReference;
  constructor(private auth: Auth, private firestore: Firestore) {
    this.collectionRef = collection(firestore, 'users');
  }

  async register(user: Users, password: string): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        user.email,
        password
      );
      if (!result.user) {
        throw new Error('User registration failed.');
      }
      const userId = result.user.uid;

      user.id = userId;
      const userDocRef = doc(this.collectionRef, userId);
      await setDoc(userDocRef, user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<Users | null> {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (!result.user) {
        throw new Error('User login failed');
      }

      const userId = result.user.uid;
      const userDocRef = doc(this.collectionRef, userId).withConverter(
        usersConverter
      );
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        throw new Error('User document not found');
      }

      return userSnapshot.data();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  getCurrentUser() {
    let user = this.auth.currentUser;
    const uid = user?.uid ?? 'bu';
    return getDoc(doc(this.collectionRef, uid).withConverter(usersConverter));
  }
}
