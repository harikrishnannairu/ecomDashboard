import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const token=inject(TokenService);
  const router =inject(Router);
  const toast=inject(ToastrService);

  if(token.isLoggedIn()) return true;

toast.warning("Please try after logging");
router.navigateByUrl('/login');
  return false;
};
