import { Injectable } from '@angular/core';
import {
  collectionData,
  CollectionReference,
  docData,
  Firestore,
  writeBatch,
} from '@angular/fire/firestore';
import {
  collection,
  doc,
  increment,
  orderBy,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { Products, productsConverter } from '../models/Product';
import { catchError, map, Observable, of } from 'rxjs';
import { AuditAction, AuditLog, AuditType } from '../models/AuditLog';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collectionRef: CollectionReference;
  private auditLogRef: CollectionReference;
  constructor(private firestore: Firestore) {
    this.auditLogRef = collection(firestore, 'audits');
    this.collectionRef = collection(firestore, 'products');
  }
  getProduct(id: string): Observable<Products | null> {
    return docData(
      doc(this.collectionRef, id).withConverter(productsConverter)
    ).pipe(
      map((data: Products | undefined) => data ?? null),
      catchError(() => of(null))
    );
  }

  create(product: Products) {
    const batch = writeBatch(this.firestore);
    const id = doc(this.collectionRef).id;
    product.id = id;
    const auditID = doc(this.auditLogRef).id;
    const audit: AuditLog = {
      id: auditID,
      user: 'ADMIN',
      action: AuditAction.CREATED,
      type: AuditType.PRODUCT,
      data: {
        id: product.id,
        name: product.name,
        quantity: product.stock,
      },
      description: `Product "${product.name}" created with quantity ${product.stock}.`,
      created: new Date(),
    };

    batch.set(
      doc(this.collectionRef, product.id).withConverter(productsConverter),
      product
    );

    batch.set(doc(this.auditLogRef, audit.id), audit);

    return batch.commit();
  }

  deleteProduct(id: string) {
    const batch = writeBatch(this.firestore);

    const auditID = doc(this.auditLogRef).id;
    const audit: AuditLog = {
      id: auditID,
      user: 'ADMIN',
      action: AuditAction.REMOVED,
      type: AuditType.PRODUCT,
      data: { id },
      description: `Product with ID "${id}" was deleted.`,
      created: new Date(),
    };

    batch.delete(doc(this.collectionRef, id));
    batch.set(doc(this.auditLogRef, audit.id), audit);

    return batch.commit();
  }

  updateProduct(id: string, product: Products) {
    const batch = writeBatch(this.firestore);
    const auditID = doc(this.auditLogRef).id;
    const audit: AuditLog = {
      id: auditID,
      user: 'ADMIN',
      action: AuditAction.UPDATED,
      type: AuditType.PRODUCT,
      data: {
        id: id,
        name: product.name,
        quantity: product.stock,
      },
      description: `Product "${product.name}" updated. Quantity: ${product.stock}.`,
      created: new Date(),
    };

    batch.update(
      doc(this.collectionRef, id).withConverter(productsConverter),
      product
    );

    batch.set(doc(this.auditLogRef, audit.id), audit);

    return batch.commit();
  }

  getAll(): Observable<Products[]> {
    const q = query(
      this.collectionRef.withConverter(productsConverter),
      orderBy('updated', 'desc')
    );
    return collectionData(q);
  }
  async addStock(id: string, stock: number) {
    const batch = writeBatch(this.firestore);

    // 1. Update product stock
    batch.update(doc(this.collectionRef, id), {
      stock: increment(stock),
    });

    const auditID = doc(this.auditLogRef).id;
    const audit: AuditLog = {
      id: auditID,
      user: 'ADMIN',
      action: AuditAction.ADDED,
      type: AuditType.INVENTORY,
      data: {
        id: id,
        quantity: stock,
      },
      description: `Added ${stock} stock to product with id ${id}.`,
      created: new Date(),
    };
    batch.set(doc(this.auditLogRef, audit.id), audit);

    return batch.commit();
  }

  async removeStock(id: string, stock: number) {
    const batch = writeBatch(this.firestore);

    // 1. Update product stock
    batch.update(doc(this.collectionRef, id), {
      stock: increment(-stock),
    });

    // 2. Create audit log
    const auditID = doc(this.auditLogRef).id;
    const audit: AuditLog = {
      id: auditID,
      user: 'ADMIN',
      action: AuditAction.REMOVED,
      type: AuditType.INVENTORY,
      data: {
        id: id,
        quantity: stock,
      },
      description: `Removed ${stock} stock from product  with id ${id}.`,
      created: new Date(),
    };
    batch.set(doc(this.auditLogRef, audit.id), audit);
    return batch.commit();
  }
}
