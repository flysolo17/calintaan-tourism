import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Products {
  id: string;
  sku: string;
  name: string;
  description: string;
  cost: number;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  stockAlert: StockAlert;
  created: Date;
  updated: Date;
}

export interface StockAlert {
  enabled: boolean;
  lowStockQuantity: number;
}

export const productsConverter = {
  toFirestore: (data: Products) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const product = snap.data() as Products;
    product.created = (product.created as any).toDate();
    product.updated = (product.updated as any).toDate();
    return product;
  },
};
