import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Products } from '../../models/Product';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../common/product-card/product-card.component';
import { delay, map, Subscription } from 'rxjs';
import { AdminProductCardComponent } from './admin-product-card/admin-product-card.component';
import { Router } from '@angular/router';
import { ProductData } from '../../models/AuditLog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    MatButton,
    MatDialogModule,
    CommonModule,
    ProductCardComponent,
    MatProgressBarModule,
    AdminProductCardComponent,
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  productForm$: FormGroup;
  products$: Products[] = [];

  productsSub?: Subscription;
  loading$ = false;
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {
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
  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.loading$ = true;
    this.productsSub = this.productService.getAll().subscribe({
      next: (product) => {
        delay(2000);
        this.products$ = product;
        this.loading$ = false;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.loading$ = false;
      },
    });
  }

  openDialog() {
    const categories = Array.from(
      new Set(this.products$.map((e) => e.category.toLocaleUpperCase()))
    );

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
  }
  onClick(id: string) {
    this.router.navigate(['/administration/products', id]);
  }
}
