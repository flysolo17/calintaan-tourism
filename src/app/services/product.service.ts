import { Injectable } from '@angular/core';
import {
  collectionData,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { Products, productsConverter } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collectionRef: CollectionReference;
  constructor(private firestore: Firestore) {
    this.collectionRef = collection(firestore, 'products');
  }
  create(product: Products) {
    const id = doc(this.collectionRef).id;
    product.id = id;
    return setDoc(
      doc(this.collectionRef, product.id).withConverter(productsConverter),
      product
    );
  }
  getAll(): Observable<Products[]> {
    const q = query(
      this.collectionRef.withConverter(productsConverter),
      orderBy('updated', 'desc')
    );
    return collectionData(q);
  }
}
