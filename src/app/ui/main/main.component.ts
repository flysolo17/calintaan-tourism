import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavItem } from './NavItems';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BarangayService } from '../../services/barangay.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatListModule,
    RouterOutlet,
    MatIconModule,
    RouterLink,
    MatToolbarModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  items$: NavItem[] = [
    { label: 'Dashboard', route: '/main/dashboard', icon: 'dashboard' },
    { label: 'Barangays', route: '/main/barangays', icon: 'map' },
    { label: 'Products', route: '/main/products', icon: 'people' },
    {
      label: 'News and events',
      route: '/main/news-and-events',
      icon: 'campaign',
    },
    { label: 'Bookings', route: '/main/bookings', icon: 'settings' },
    { label: 'Transactions', route: '/main/transactions', icon: 'group' },
  ];

  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.signout().then((success) => {
      if (success) {
        this.router.navigate(['/landing-page']);
        console.log('User signed out successfully');
      } else {
        console.log('Sign out failed');
      }
    });
  }
}
