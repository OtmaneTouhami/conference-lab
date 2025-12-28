export const environment = {
    production: true,
    apiUrl: 'http://localhost:8888',
    keycloak: {
        issuer: 'http://localhost:8180/realms/conference-realm',
        clientId: 'angular-frontend',
        redirectUri: window.location.origin,
    }
};
