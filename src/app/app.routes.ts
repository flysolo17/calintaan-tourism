import { Routes } from '@angular/router';
import { LandingPageComponent } from './ui/landing-page/landing-page.component';
import { MainComponent } from './ui/main/main.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './ui/main/dashboard/dashboard.component';
import { ProductsComponent } from './ui/main/products/products.component';
import { BookingsComponent } from './ui/main/bookings/bookings.component';
import { TransactionsComponent } from './ui/main/transactions/transactions.component';
import { ProductListComponent } from './ui/main/products/product-list/product-list.component';
import { CreateProductComponent } from './ui/main/products/create-product/create-product.component';
import { ViewProductComponent } from './ui/main/products/view-product/view-product.component';
import { BarangaysListComponent } from './ui/main/barangays/barangays-list/barangays-list.component';
import { CreateBarangaysComponent } from './ui/main/barangays/create-barangays/create-barangays.component';
import { NewsAndEventsComponent } from './ui/main/news-and-events/news-and-events.component';
import { ViewPostComponent } from './ui/main/news-and-events/view-post/view-post.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing-page',
    pathMatch: 'full',
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'news-and-events',
        component: NewsAndEventsComponent,
        children: [
          {
            path: ':id',
            component: ViewPostComponent,
          },
        ],
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: '',
            component: ProductListComponent,
          },

          {
            path: 'list',
            component: ProductListComponent,
          },
          {
            path: 'create',
            component: CreateProductComponent,
          },
        ],
      },
      {
        path: 'bookings',
        component: BookingsComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'barangays',
        children: [
          {
            path: '',
            component: BarangaysListComponent,
          },
          {
            path: 'list',
            component: BarangaysListComponent,
          },
          {
            path: 'create',
            component: CreateBarangaysComponent,
          },
        ],
      },
    ],
  },
];
