import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './ui/common/topbar/topbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './ui/auth/login-dialog/login-dialog.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { map, Subscription, tap } from 'rxjs';

import { User, UserRole } from './models/User';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDialogModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'calintaan-tourism';
  userSubscription = new Subscription();
  user$: User | null = null;
  onSearchTextChange(value: String) {
    console.log('Search text changed:', value);
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user: User | null) => {
        this.user$ = user;
        if (user?.role === UserRole.ADMIN) {
          this.router.navigate(['main']);
        }
      });
  }
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
