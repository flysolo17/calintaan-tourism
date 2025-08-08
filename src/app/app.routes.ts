import { Routes } from '@angular/router';
import { LandingPageContainerComponent } from './landing-page/landing-page-container/landing-page-container.component';
import { HomeComponent } from './landing-page/home/home.component';
import { AboutComponent } from './landing-page/about/about.component';
import { ProductsComponent } from './landing-page/products/products.component';
import { TouristSpotComponent } from './landing-page/tourist-spot/tourist-spot.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SuccessComponent } from './payment/success/success.component';
import { CancelComponent } from './payment/cancel/cancel.component';
import { AdminContainerComponent } from './admin/admin-container/admin-container.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminTransactionsComponent } from './admin/admin-transactions/admin-transactions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing-page',
    pathMatch: 'full',
  },
  {
    path: 'landing-page',
    component: LandingPageContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'tourist-spot',
        component: TouristSpotComponent,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'payment',
    children: [
      {
        path: 'success',
        component: SuccessComponent,
      },
      {
        path: 'cancel',
        component: CancelComponent,
      },
    ],
  },
  {
    path: 'administration',
    component: AdminContainerComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'products',
        component: AdminProductsComponent,
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
      {
        path: 'transactions',
        component: AdminTransactionsComponent,
      },
    ],
  },
];
