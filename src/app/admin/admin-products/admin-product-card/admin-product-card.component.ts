import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { Products } from '../../../models/Product';
@Component({
  selector: 'app-admin-product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatChipsModule],
  templateUrl: './admin-product-card.component.html',
  styleUrl: './admin-product-card.component.scss',
})
export class AdminProductCardComponent {
  @Input({ required: true }) product!: Products;
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }

  get stockAlertEnabledAndLowOnStock(): boolean {
    return (
      this.product.stockAlert.enabled &&
      this.product.stock <= this.product.stockAlert.lowStockQuantity
    );
  }
}
