import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Products } from '../../models/Product';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [MatButton, MatDialogModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  productForm$: FormGroup;
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
    const dialogRef = this.dialog.open(CreateProductDialogComponent);

    dialogRef.afterClosed().subscribe((result: Products) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
