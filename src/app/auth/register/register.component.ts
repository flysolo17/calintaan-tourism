import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Users, UserType } from '../../models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  showPassword = false;
  registerForm$: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm$ = this.fb.group({
      name: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{11}$'), // 11-digit numeric only
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.registerForm$.invalid) {
      this.registerForm$.markAllAsTouched();
      return;
    }

    const form = this.registerForm$.value;

    const user: Users = {
      id: '',
      name: form.name,
      phone: form.phone,
      profile: '',
      email: form.email,
      type: UserType.USERS,
    };

    try {
      await this.authService.register(user, form.password);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }
}
