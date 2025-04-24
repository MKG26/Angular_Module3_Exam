import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;

        if (!isAuth) {
          return this.router.createUrlTree(['/auth']);
        }

        const isAdmin = user.email === 'admin@gmail.com';
        const currentPath = route.routeConfig?.path;

        if (isAdmin && currentPath === 'home') {
          return this.router.createUrlTree(['inventory']);
        }

        if (!isAdmin && currentPath === 'inventory') {
          return this.router.createUrlTree(['home']);
        }

        return true;
      })
    );
  }
}
