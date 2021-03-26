export declare class AuthzUser {
    roles: Record<string, any>;
    iss: string;
    sub: string;
    aud: string[];
    iat: number;
    exp: number;
    azp: string;
    scope: string;
    permissions: string[];
    constructor(roles: Record<string, any>, iss: string, sub: string, aud: string[], iat: number, exp: number, azp: string, scope: string, permissions: string[]);
}
export interface AuthRequest {
    user: AuthzUser;
}
