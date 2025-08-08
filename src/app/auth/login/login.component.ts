import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserType } from '../../models/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm$: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm$ = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm$.invalid) {
      return;
    }
    let email: string = this.loginForm$.get('email')?.value ?? '';
    let password: string = this.loginForm$.get('password')?.value ?? '';
    this.authService.login(email, password).then((user) => {
      if (user === null) {
        alert('User not found!');
        return;
      }
      if (user.type == UserType.ADMIN) {
        alert('Successfully Logged in!');
        this.router.navigate(['administration']);
      }
    });
  }
}
