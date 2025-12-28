import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoading()) {
        return new Promise<boolean>((resolve) => {
            const checkAuth = setInterval(() => {
                if (!authService.isLoading()) {
                    clearInterval(checkAuth);
                    if (authService.isAuthenticated()) {
                        resolve(true);
                    } else {
                        authService.login();
                        resolve(false);
                    }
                }
            }, 100);
        });
    }

    if (authService.isAuthenticated()) {
        return true;
    }

    authService.login();
    return false;
};

export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoading()) {
        return new Promise<boolean>((resolve) => {
            const checkAuth = setInterval(() => {
                if (!authService.isLoading()) {
                    clearInterval(checkAuth);
                    if (authService.isAdmin()) {
                        resolve(true);
                    } else {
                        router.navigate(['/']);
                        resolve(false);
                    }
                }
            }, 100);
        });
    }

    if (authService.isAdmin()) {
        return true;
    }

    router.navigate(['/']);
    return false;
};
