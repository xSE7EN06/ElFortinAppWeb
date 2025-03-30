import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthService } from "../../services/auth/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanMatch{
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    private checkAuthStatus(): boolean {
      const isAuthenticated = this.authService.isAuthenticated();
      console.log('Authenticated: ', isAuthenticated);
      
      if (!isAuthenticated) {
          this.router.navigate(['./auth/login']);
      }
      
      return isAuthenticated;
  }

    canMatch(route: Route,segments: UrlSegment[]):boolean | Observable<boolean>{
        return this.checkAuthStatus();
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean | Observable<boolean>{
        return this.checkAuthStatus();
    }

}