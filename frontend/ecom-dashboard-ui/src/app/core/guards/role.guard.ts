import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { TokenService } from "../services/token.service";
import { ToastrService } from "ngx-toastr";

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const token=inject(TokenService);
  const router =inject(Router);
  const toast=inject(ToastrService);

  const allowed=route.data?.['roles'] as Array<'ADMIN'|'STAFF'> | undefined;
  const role=token.getRole();

  if(!token.isLoggedIn()){
    toast.warning("Please try after logging");
    router.navigateByUrl('/login');
    return false;
  }
  if(!allowed || (role && allowed.includes(role))){
    return true;
  }
  toast.error("You dont have accesss to this page ");
  router.navigateByUrl('/unauthorized');
  return false;
    
}