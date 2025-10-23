import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
} from '@angular/fire/auth';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import { User, UserConverter, UserRole } from '../models/User';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_COLLECTION = 'users';
  constructor(private auth: Auth, private firestore: Firestore) {}

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
  signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  getCurrentUser(): Observable<User | null> {
    return authState(this.auth).pipe(
      switchMap(async (user) => {
        if (!user?.uid) {
          console.warn('No authenticated user found');
          return null;
        }

        console.log('Authenticated user detected:', user.uid);

        const ref = doc(this.firestore, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          return snap.data() as User;
        } else {
          return null;
        }
      })
    );
  }
  async signout(): Promise<boolean> {
    try {
      let result = await this.auth.signOut();
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    }
  }
}
