import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AfterAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.getToken()) {
      console.log('guard');
      this.router.navigateByUrl('/Node');
      return false;
    }
    return true;
  }
}
