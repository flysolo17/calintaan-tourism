import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface AuditLog {
  id: string;
  user: string;
  action: AuditAction;
  type: AuditType;
  data: any;
  description?: string;
  created: Date;
}

export const AuditLogConverter = {
  toFirestore: (data: AuditLog) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as AuditLog;
    data.created = (data.created as any).toDate();

    return data;
  },
};

export interface ProductData {
  id: string;
  name: string;
  quantity: number;
}

export enum AuditAction {
  CREATED = 'CREATED', // New entity created
  UPDATED = 'UPDATED', // Existing entity updated
  ADDED = 'ADDED', // Item added (e.g., to cart or inventory)
  REMOVED = 'REMOVED', // Item removed
  PURCHASED = 'PURCHASED', // Order placed or product purchased
  RETURNED = 'RETURNED',
}

export enum AuditType {
  INVENTORY = 'INVENTORY',
  PRODUCT = 'PRODUCT',
  ORDER = 'ORDER',
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}
