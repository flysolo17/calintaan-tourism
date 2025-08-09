import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { CollectionReference } from '@angular/fire/firestore';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
  writeBatch,
} from '@firebase/firestore';
import {
  generateTransactionRemark,
  PaymentInfo,
  Transaction,
  transactionsConverter,
  TransactionStatus,
} from '../models/Transaction';
import { AuditLog, AuditAction, AuditType } from '../models/AuditLog';
import { productsConverter } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly transactionRef: CollectionReference;
  private readonly auditLogRef: CollectionReference;
  private readonly productRef: CollectionReference;
  constructor(private firestore: Firestore) {
    this.transactionRef = collection(firestore, 'transactions');
    this.productRef = collection(firestore, 'products');
    this.auditLogRef = collection(firestore, 'audits');
  }
  async createTransaction(transaction: Transaction) {
    const unavailable = await this.checkProductAvailability(transaction.items);
    if (unavailable.length > 0) {
      throw new Error(
        'Some products are unavailable: ' +
          unavailable
            .map(
              (u) =>
                `${u.name} (requested: ${u.requested}, available: ${u.available})`
            )
            .join(', ')
      );
    }

    const batch = writeBatch(this.firestore);

    transaction.id = doc(this.transactionRef).id;
    transaction.remarks = generateTransactionRemark(transaction.status);

    batch.set(doc(this.transactionRef, transaction.id), transaction);

    transaction.items.forEach((e) => {
      batch.update(doc(this.productRef, e.id), {
        stock: increment(-Number(e.quantity)),
      });

      const auditID = doc(this.auditLogRef).id;
      const audit: AuditLog = {
        id: auditID,
        user: 'SYSTEM',
        action: AuditAction.PURCHASED,
        type: AuditType.INVENTORY,
        data: {
          id: e.id,
          name: e.name,
          quantity: e.quantity,
          transactionId: transaction.id,
        },
        description: `Purchased ${e.quantity} of "${e.name}" in transaction ${transaction.id}.`,
        created: new Date(),
      };

      batch.set(doc(this.auditLogRef, audit.id), audit);
    });

    return batch.commit();
  }

  async rejected(transaction: Transaction) {
    const batch = writeBatch(this.firestore);
    const updatedTransaction = {
      ...transaction,
      status: TransactionStatus.CANCELLED,
      remarks: generateTransactionRemark(TransactionStatus.CANCELLED),
      updated: new Date(),
    };
    batch.update(doc(this.transactionRef, transaction.id), {
      status: updatedTransaction.status,
      remarks: updatedTransaction.remarks,
      updated: updatedTransaction.updated,
    });
    transaction.items.forEach((e) => {
      batch.update(doc(this.productRef, e.id), {
        stock: increment(Number(e.quantity)),
      });

      const auditID = doc(this.auditLogRef).id;
      const audit: AuditLog = {
        id: auditID,
        user: 'SYSTEM',
        action: AuditAction.RETURNED,
        type: AuditType.INVENTORY,
        data: {
          id: e.id,
          name: e.name,
          quantity: e.quantity,
          transactionId: transaction.id,
        },
        description: `Returned ${e.quantity} of "${e.name}" from rejected transaction ${transaction.id}.`,
        created: new Date(),
      };
      batch.set(doc(this.auditLogRef, audit.id), audit);
    });
    return batch.commit();
  }

  async checkProductAvailability(items: Item[]) {
    const ids = items.map((e) => e.id);
    if (ids.length > 10) {
      throw new Error('Too many items to check at once. Limit is 10.');
    }

    const q = query(
      this.productRef.withConverter(productsConverter),
      where('id', 'in', ids)
    );
    const snapshot = await getDocs(q);

    const unavailable: {
      id: string;
      name: string;
      requested: number;
      available: number;
    }[] = [];

    snapshot.forEach((docSnap) => {
      const product = docSnap.data();
      const requestedItem = items.find((i) => i.id === product.id);

      if (requestedItem && product.stock < Number(requestedItem.quantity)) {
        unavailable.push({
          id: product.id,
          name: product.name,
          requested: Number(requestedItem.quantity),
          available: product.stock,
        });
      }
    });
    ids.forEach((id) => {
      if (!snapshot.docs.find((d) => d.id === id)) {
        unavailable.push({
          id,
          name: 'Unknown product',
          requested: Number(items.find((i) => i.id === id)?.quantity) || 0,
          available: 0,
        });
      }
    });
    return unavailable;
  }

  confirmPayment(id: string, payment: PaymentInfo) {
    return updateDoc(
      doc(this.transactionRef, id).withConverter(transactionsConverter),
      {
        status: TransactionStatus.CONFIRMED,
        payment: payment,
        updated: new Date(),
        remarks: generateTransactionRemark(TransactionStatus.CONFIRMED),
      }
    );
  }
}
