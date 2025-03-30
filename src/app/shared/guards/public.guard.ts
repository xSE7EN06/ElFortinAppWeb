import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate, CanMatch {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    private checkAuthStatus(): boolean {
        const isAuthenticated = this.authService.isAuthenticated();
        console.log('PublicGuard - Authenticated: ', isAuthenticated);
        
        // Si ESTÁ autenticado, redirigir al dashboard/home
        if (isAuthenticated) {
            this.router.navigate(['/inicio']); // Cambia esta ruta según tu necesidad
            return false; // Bloquea el acceso a la ruta pública
        }
        
        return true; // Permite el acceso a la ruta pública
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean {
        return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthStatus();
    }
}