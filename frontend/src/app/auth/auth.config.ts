import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
    issuer: environment.keycloak.issuer,
    redirectUri: environment.keycloak.redirectUri,
    clientId: environment.keycloak.clientId,
    responseType: 'code',
    scope: 'openid profile email',
    showDebugInformation: !environment.production,
    requireHttps: false,
    strictDiscoveryDocumentValidation: false,
};
