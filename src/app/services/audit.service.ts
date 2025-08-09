import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuditLog, AuditLogConverter } from '../models/AuditLog';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  readonly auditRef: CollectionReference;
  constructor(private firestore: Firestore) {
    this.auditRef = collection(firestore, 'audits');
  }

  getAll(): Observable<AuditLog[]> {
    const q = query(this.auditRef, orderBy('created', 'desc')).withConverter(
      AuditLogConverter
    );
    return collectionData(q);
  }
  getAllByProductId(id: string): Observable<AuditLog[]> {
    const q = query(
      this.auditRef,
      where('data.id', '==', id),
      orderBy('created', 'desc')
    ).withConverter(AuditLogConverter);

    return collectionData(q);
  }
}
