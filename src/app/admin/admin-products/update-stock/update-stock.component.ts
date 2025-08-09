import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Products } from '../../../models/Product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-stock',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './update-stock.component.html',
  styleUrl: './update-stock.component.scss',
})
export class UpdateStockComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateStockComponent>);
  stocks = new FormControl(0);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: 'in' | 'out';
    }
  ) {}

  save() {
    if (this.stocks.value === null || this.stocks.value <= 0) {
      alert('Please add stocks');
      return;
    }
    this.dialogRef.close(this.stocks.value);
  }
}
