import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavigationItem } from '../../landing-page/components/header/NavigationItem';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
export const ADMIN_NAV_ITEMS: NavigationItem[] = [
  {
    label: 'Dashboard',
    route: '/administration/home',
    icon: 'dashboard',
  },
  {
    label: 'Products',
    route: '/administration/products',
    icon: 'inventory_2',
  },
  {
    label: 'Orders',
    route: '/administration/orders',
    icon: 'shopping_cart',
  },
  {
    label: 'Transactions',
    route: '/administration/transactions',
    icon: 'receipt_long',
  },
];

@Component({
  selector: 'app-admin-container',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,

    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './admin-container.component.html',
  styleUrl: './admin-container.component.scss',
})
export class AdminContainerComponent {
  items$ = ADMIN_NAV_ITEMS;
  open = true;
  screenSize: 'small' | 'large' = 'large';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.screenSize = result.matches ? 'small' : 'large';
        let value = this.screenSize === 'large' ? true : false;
        console.log(this.screenSize);
        this.toggleNavBar(value);
      });
  }
  toggleNavBar(value: boolean) {
    this.open = value;
  }
}
