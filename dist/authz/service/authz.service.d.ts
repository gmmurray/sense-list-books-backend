import { ObjectWithId, RolesData } from 'auth0';
export declare class AuthzService {
    private readonly managementClient;
    private readonly domain;
    private readonly clientId;
    private readonly clientSecret;
    private readonly managementAudience;
    constructor();
    getUserById: (params: ObjectWithId) => Promise<import("auth0").User<import("auth0").AppMetadata, import("auth0").UserMetadata>>;
    assignRolesToUser: (params: ObjectWithId, roles: RolesData) => Promise<void>;
}
