import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Item } from './Item';

export interface Transaction {
  id: string;
  user: string;
  username: string;
  items: Item[];
  currency: string;
  payment: PaymentInfo | null;
  status: TransactionStatus;
  remarks: string;
  created: Date;
  updated: Date;
}

export function generateTransactionRemark(status: TransactionStatus): string {
  switch (status) {
    case TransactionStatus.PENDING:
      return 'Your order has been placed and is awaiting confirmation.';
    case TransactionStatus.CONFIRMED:
      return 'Your payment has been confirmed. We will start processing your order soon.';
    case TransactionStatus.PROCESSING:
      return 'Your order is being prepared.';
    case TransactionStatus.SHIPPED:
      return 'Your order has been shipped and is on its way.';
    case TransactionStatus.DELIVERED:
      return 'Your order has been delivered successfully.';
    case TransactionStatus.CANCELLED:
      return 'Your order has been cancelled.';
    case TransactionStatus.REFUNDED:
      return 'Your payment has been refunded.';
    default:
      return '';
  }
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  REJECTED = 'REJECTED',
}

export interface Transaction {
  id: string;
  user: string;
  username: string;
  items: Item[];
  currency: string;
  payment: PaymentInfo | null;
  status: TransactionStatus; // New field
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
