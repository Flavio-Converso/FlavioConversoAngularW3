import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard {
  constructor(private authService: AuthService, private router: Router) {}
  private redirectToDashboard(): boolean {
    this.router.navigate(['/dashboard']);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const url: string = state.url;
    if (this.authService.syncIsLoggedIn) {
      return this.redirectToDashboard();
    }
    if (url === '/auth/login' || url === '/auth/register') {
      return true;
    }
    return this.redirectToDashboard();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
