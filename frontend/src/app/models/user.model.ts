export interface UserProfile {
    sub: string;
    preferred_username: string;
    email: string;
    given_name?: string;
    family_name?: string;
    name?: string;
    realm_access?: {
        roles: string[];
    };
}
