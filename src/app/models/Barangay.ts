import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Barangay {
  id: string;
  name: string;
  description: string;
  images: string[];
  population: number;
  areaSize?: number;
  latitude?: number;
  longitude?: number;
  culture?: string;
  history?: string;
  economy?: string;
  mainProducts?: string[];
  schools?: string[];
  healthCenters?: string[];
  transportation?: string[];
  emergencyContacts?: {
    police?: string;
    fire?: string;
    hospital?: string;
    barangayHall?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
export const BarangayConverter = {
  toFirestore: (data: Barangay) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Barangay;
    data.createdAt = (data.createdAt as any).toDate();
    data.updatedAt = (data.updatedAt as any).toDate();
    return data;
  },
};
