import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Products } from '../../models/Product';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../common/product-card/product-card.component';
import { map } from 'rxjs';
import { AdminProductCardComponent } from './admin-product-card/admin-product-card.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    MatButton,
    MatDialogModule,
    CommonModule,
    ProductCardComponent,
    AdminProductCardComponent,
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  productForm$: FormGroup;
  readonly products$ = this.productService.getAll();
  readonly categories$ = this.products$.pipe(
    map((products) =>
      Array.from(new Set(products.map((p) => p.category.toLocaleUpperCase())))
    ),
    map((categories) => categories.sort())
  );

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm$ = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit(): void {}

  openDialog() {
    this.categories$.subscribe((categories) => {
      const dialogRef = this.dialog.open(CreateProductDialogComponent, {
        data: { categories: categories },
      });

      dialogRef.afterClosed().subscribe((result: Products | null) => {
        if (result) {
          this.productService
            .create(result)
            .then(() => alert('New Product Created!'));
        }
      });
    });
  }
  onClick() {}
}
