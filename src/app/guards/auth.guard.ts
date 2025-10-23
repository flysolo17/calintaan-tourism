import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { UserRole } from '../models/User';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.getCurrentUser().pipe(
    map((user) => {
      if (user && user.role === UserRole.ADMIN) {
        return true;
      } else {
        router.navigate(['landing-page']);
        return false;
      }
    })
  );
};
