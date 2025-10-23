import { user } from '@angular/fire/auth';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  profile?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const UserConverter = {
  toFirestore: (data: User) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as User;
    data.createdAt = (data.createdAt as any).toDate();
    data.updatedAt = (data.updatedAt as any).toDate();
    return data;
  },
};
