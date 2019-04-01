import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authService: AuthService,
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkAuthentication().pipe(
      tap((status: boolean) => {
        if (!status) {
          this.authService.redirectLogin();
        }
      }),
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
