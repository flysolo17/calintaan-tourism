import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Barangay, BarangayConverter } from '../models/Barangay';
import { Observable } from 'rxjs';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { convertToWebp } from '../utils/ImageCompressor';

@Injectable({
  providedIn: 'root',
})
export class BarangayService {
  private readonly COLLECTION_BARANGAY = 'barangays';
  constructor(private firestore: Firestore, private storage: Storage) {}

  async create(barangay: Barangay, images: File[]): Promise<void> {
    const barangayRef = doc(
      collection(this.firestore, this.COLLECTION_BARANGAY)
    );
    const id = barangayRef.id;
    barangay.id = id;
    const uploadPromises = images.map(async (file) => {
      const filePath = `${this.COLLECTION_BARANGAY}/${id}/${file.name}`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    });

    const urls = await Promise.all(uploadPromises);
    barangay.images = urls;
    barangay.createdAt = new Date();
    barangay.updatedAt = new Date();

    await setDoc(barangayRef, barangay);
  }

  getAll(): Observable<Barangay[]> {
    const q = query(
      collection(this.firestore, this.COLLECTION_BARANGAY).withConverter(
        BarangayConverter
      ),
      orderBy('name', 'asc')
    );
    return collectionData(q, { idField: 'id' });
  }
  deleteBarangay(id: string) {}

  async getAllBarangay(): Promise<Barangay[]> {
    const q = query(
      collection(this.firestore, this.COLLECTION_BARANGAY).withConverter(
        BarangayConverter
      ),
      orderBy('name', 'asc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Barangay);
  }
}
