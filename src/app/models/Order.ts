import { Item } from './Item';

export interface Order {
  id: string;
  userId: string;
  items: Item[];
  currency: string;
  cancelUrl: string;
  successUrl: string;
}
