import { Injectable } from '@nestjs/common';
import { ManagementClient, ObjectWithId, RolesData } from 'auth0';

const CACHE_TTL_SECONDS = 10;

@Injectable()
export class AuthzService {
  private readonly managementClient: ManagementClient;
  private readonly domain = process.env.AUTH0_APP_DOMAIN;
  private readonly clientId = process.env.AUTH0_APP_CLIENT_ID;
  private readonly clientSecret = process.env.AUTH0_APP_CLIENT_SECRET;
  private readonly managementAudience =
    process.env.AUTH0_MANAGEMENT_API_IDENTIFIER;
  constructor() {
    this.managementClient = new ManagementClient({
      domain: this.domain,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      audience: this.managementAudience,
      tokenProvider: {
        enableCache: true,
        cacheTTLInSeconds: CACHE_TTL_SECONDS,
      },
    });
  }

  getUserById = (params: ObjectWithId) => this.managementClient.getUser(params);
  assignRolesToUser = (params: ObjectWithId, roles: RolesData) =>
    this.managementClient.assignRolestoUser(params, roles);
}
