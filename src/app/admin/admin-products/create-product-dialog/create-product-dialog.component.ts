import { Component, Inject, model, OnInit } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.scss',
})
export class CreateProductDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CreateProductDialogComponent>);

  categories$!: Observable<string[]>;
  enabled = false;
  productForm$: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] }
  ) {
    this.productForm$ = this.fb.group(
      {
        id: [''],
        sku: ['', [Validators.required, Validators.minLength(3)]],
        name: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', Validators.required],
        cost: [0, [Validators.required, Validators.min(0)]],
        price: [0, [Validators.required, Validators.min(0)]],
        imageUrl: [
          '',
          [
            Validators.required,
            Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i),
          ],
        ],
        category: ['', Validators.required],
        stock: [0, [Validators.required, Validators.min(0)]],
        enabled: [false],
        lowStockQuantity: [0, [Validators.min(0)]],
      },
      { validators: this.priceGreaterThanCostValidator }
    );
  }
  ngOnInit(): void {
    this.categories$ = of(this.data.categories ?? []);
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
      cost: data.cost,
      stockAlert: {
        enabled: data.enabled,
        lowStockQuantity: data.lowStockQuantity,
      },
    };
    this.dialogRef.close(product);
  }
  private priceGreaterThanCostValidator(group: FormGroup) {
    const cost = group.get('cost')?.value;
    const price = group.get('price')?.value;
    return price >= cost ? null : { priceLessThanCost: true };
  }
}
