import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Inject OAuthService directly to avoid circular dependency with AuthService
    const oauthService = inject(OAuthService);

    // Only add token for API requests to our gateway
    if (!req.url.startsWith(environment.apiUrl)) {
        return next(req);
    }

    const token = oauthService.getAccessToken();

    if (token) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return next(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    oauthService.initCodeFlow();
                }
                return throwError(() => error);
            })
        );
    }

    return next(req);
};
