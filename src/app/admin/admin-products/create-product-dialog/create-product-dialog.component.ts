import { Component, model } from '@angular/core';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { Products } from '../../../models/Product';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.scss',
})
export class CreateProductDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateProductDialogComponent>);
  readonly data = inject<Products>(MAT_DIALOG_DATA);

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
  onNoClick(): void {
    this.dialogRef.close();
  }
  save() {
    if (this.productForm$.invalid) {
      return;
    }

    const data = this.productForm$.value;
    const product: Products = {
      id: '',
      sku: data.sku,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      category: data.category,
      stock: data.stock,
      created: new Date(),
      updated: new Date(),
    };
    this.dialogRef.close(product);
  }
}
