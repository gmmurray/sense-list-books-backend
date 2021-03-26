"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthzUser = void 0;
class AuthzUser {
    constructor(roles, iss, sub, aud, iat, exp, azp, scope, permissions) {
        this.roles = roles;
        this.iss = iss;
        this.sub = sub;
        this.aud = aud;
        this.iat = iat;
        this.exp = exp;
        this.azp = azp;
        this.scope = scope;
        this.permissions = permissions;
    }
}
exports.AuthzUser = AuthzUser;
//# sourceMappingURL=authzUser.js.map