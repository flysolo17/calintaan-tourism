import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Item } from './Item';

export interface Transaction {
  id: string;
  userId: string;
  items: Item[];
  currency: string;
  payment: PaymentInfo | null;
  created: Date;
  updated: Date;
}

export const transactionsConverter = {
  toFirestore: (data: Transaction) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const transaction = snap.data() as Transaction;
    transaction.created = (transaction.created as any).toDate();
    transaction.updated = (transaction.updated as any).toDate();
    return transaction;
  },
};

export interface PaymentInfo {
  referenceId: string;
  name: string;
  email: string;
  accountId: string;
  amount: string;
  created: string;
}
