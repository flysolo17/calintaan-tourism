import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Products } from '../../../models/Product';
import { combineLatest, delay, Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { AuditService } from '../../../services/audit.service';
import { AuditLog } from '../../../models/AuditLog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateStockComponent } from '../update-stock/update-stock.component';
import { MatTableModule } from '@angular/material/table';
export interface AuditData {
  name: string;
  action: string;
  type: string;
  description: string;
  created: string;
}
@Component({
  selector: 'app-admin-view-product',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  templateUrl: './admin-view-product.component.html',
  styleUrl: './admin-view-product.component.scss',
})
export class AdminViewProductComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  product: Products | null = null;
  viewProductSub?: Subscription;
  loading$ = false;
  audits$: AuditLog[] = [];

  auditColumns = [
    {
      columnDef: 'name',
      header: 'User name',
      cell: (element: AuditLog) => `${element.user}`,
    },
    {
      columnDef: 'action',
      header: 'Action',
      cell: (element: AuditLog) => `${element.action}`,
    },
    {
      columnDef: 'type',
      header: 'Type',
      cell: (element: AuditLog) => `${element.type}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (element: AuditLog) => `${element.description}`,
    },
    {
      columnDef: 'created',
      header: 'Created At',
      cell: (element: AuditLog) => `${element.created}`,
    },
  ];

  displayedAuditColumns = this.auditColumns.map((c) => c.columnDef);
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private auditLogService: AuditService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.initializeData(id);
    }
  }
  initializeData(id: string) {
    this.loading$ = true;

    const product = this.productService.getProduct(id);
    const audits = this.auditLogService.getAllByProductId(id);

    this.viewProductSub = combineLatest([product, audits]).subscribe({
      next: ([product, audits]) => {
        this.product = product;
        this.audits$ = audits;
        this.loading$ = false;
      },
      error: (err) => {
        console.error('Failed to load product or audits', err);
        this.loading$ = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.viewProductSub?.unsubscribe();
  }

  navigateBack(): void {
    this.location.back();
  }

  updateStocks(type: 'in' | 'out') {
    const dialogRef = this.dialog.open(UpdateStockComponent, {
      data: { type: type },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const num = Number(data);
        this.saveUpdatedStocks(type, num);
      }
    });
  }
  saveUpdatedStocks(type: 'in' | 'out', stocks: number) {
    if (this.product === null) {
      alert('No Product found!');
      return;
    }
    if (type === 'in') {
      this.productService
        .addStock(this.product.id, stocks)
        .then(() => alert('New Stocks added!'));
    } else {
      this.productService
        .removeStock(this.product.id, stocks)
        .then(() => alert('Stocks Removed!'));
    }
  }
}
