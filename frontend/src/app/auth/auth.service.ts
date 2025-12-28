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

    readonly isAdmin = computed(() => this.roles().includes('ADMIN'));
    readonly isUser = computed(() => this.roles().includes('USER'));

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
        const claims = this.oauthService.getIdentityClaims() as UserProfile;
        if (claims) {
            this._user.set(claims);
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
