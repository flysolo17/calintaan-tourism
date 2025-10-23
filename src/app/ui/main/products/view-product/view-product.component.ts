import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTabsModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss',
})
export class ViewProductComponent {}
