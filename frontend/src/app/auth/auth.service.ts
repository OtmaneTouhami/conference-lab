import { Injectable, inject, signal, computed } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { UserProfile } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private oauthService = inject(OAuthService);

    private _isAuthenticated = signal<boolean>(false);
    private _user = signal<UserProfile | null>(null);
    private _isLoading = signal<boolean>(true);

    readonly isAuthenticated = this._isAuthenticated.asReadonly();
    readonly user = this._user.asReadonly();
    readonly isLoading = this._isLoading.asReadonly();

    readonly roles = computed(() => {
        const user = this._user();
        if (!user) return [];
        return user.realm_access?.roles ?? [];
    });

    readonly isAdmin = computed(() => {
        const roles = this.roles();
        return roles.includes('ADMIN') || roles.includes('admin');
    });
    readonly isUser = computed(() => {
        const roles = this.roles();
        return roles.includes('USER') || roles.includes('user');
    });

    readonly displayName = computed(() => {
        const user = this._user();
        if (!user) return '';
        return user.name || user.preferred_username || user.email || '';
    });

    constructor() {
        this.initAuth();
    }

    private async initAuth(): Promise<void> {
        try {
            this.oauthService.configure(authConfig);
            await this.oauthService.loadDiscoveryDocumentAndTryLogin();

            if (this.oauthService.hasValidAccessToken()) {
                this._isAuthenticated.set(true);
                this.loadUserProfile();
                this.oauthService.setupAutomaticSilentRefresh();
            }
        } catch (error) {
            console.error('Auth initialization failed:', error);
        } finally {
            this._isLoading.set(false);
        }
    }

    private loadUserProfile(): void {
        const idClaims = this.oauthService.getIdentityClaims() as UserProfile;
        const accessToken = this.oauthService.getAccessToken();
        let accessClaims: any = {};

        if (accessToken) {
            try {
                const parts = accessToken.split('.');
                if (parts.length === 3) {
                    accessClaims = JSON.parse(atob(parts[1]));
                }
            } catch (e) {
                console.error('Error parsing access token', e);
            }
        }

        const mergedUser: UserProfile = {
            ...idClaims,
            realm_access: accessClaims.realm_access || idClaims?.realm_access
        };

        if (mergedUser) {
            this._user.set(mergedUser);
        }
    }

    login(): void {
        this.oauthService.initCodeFlow();
    }

    logout(): void {
        this.oauthService.logOut();
        this._isAuthenticated.set(false);
        this._user.set(null);
    }

    getAccessToken(): string | null {
        return this.oauthService.getAccessToken();
    }

    hasRole(role: string): boolean {
        return this.roles().includes(role);
    }

    hasAnyRole(...roles: string[]): boolean {
        return roles.some(role => this.hasRole(role));
    }
}
