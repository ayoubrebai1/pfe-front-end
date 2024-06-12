import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('role') == 'responsable') {
      this.router.navigateByUrl('/ResponsabilityCenter');
      return false;
    }else if (localStorage.getItem('role') == 'membreConseil') {
      this.router.navigateByUrl('/vote');
      return false;
    }
    return true;
  }
}
