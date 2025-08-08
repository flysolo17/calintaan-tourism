import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { Auth, onAuthStateChanged, user } from '@angular/fire/auth';
import { Users, UserType } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page-container',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './landing-page-container.component.html',
  styleUrl: './landing-page-container.component.scss',
})
export class LandingPageContainerComponent implements OnInit {
  users$: Users | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    console.log('initialized');
    this.authService
      .getCurrentUser()
      .then((user) => {
        this.users$ = user.data() ?? null;
        console.log(this.users$);
        if (this.users$?.type === UserType.ADMIN) {
          this.router.navigate(['administration']);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
