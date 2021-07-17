"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthzService = void 0;
const common_1 = require("@nestjs/common");
const auth0_1 = require("auth0");
const CACHE_TTL_SECONDS = 10;
let AuthzService = class AuthzService {
    constructor() {
        this.domain = process.env.AUTH0_APP_DOMAIN;
        this.clientId = process.env.AUTH0_APP_CLIENT_ID;
        this.clientSecret = process.env.AUTH0_APP_CLIENT_SECRET;
        this.managementAudience = process.env.AUTH0_MANAGEMENT_API_IDENTIFIER;
        this.getUserById = (params) => this.managementClient.getUser(params);
        this.assignRolesToUser = (params, roles) => this.managementClient.assignRolestoUser(params, roles);
        this.managementClient = new auth0_1.ManagementClient({
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
};
AuthzService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthzService);
exports.AuthzService = AuthzService;
//# sourceMappingURL=authz.service.js.map