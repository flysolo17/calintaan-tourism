import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/Product';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon, MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({
    required: true,
  })
  product!: Product;
}
