import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  loading = false;
  constructor(
    private dialog: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService
  ) {}
  loginWithGoogle() {
    this.loading = true;
    this.authService.signInWithGoogle().finally(() => {
      this.loading = false;

      this.dialog.close();
    });
  }
  loginWithFacebook() {
    this.loading = true;
    this.authService.signInWithFacebook().finally(() => {
      this.dialog.close();
    });
  }
}
