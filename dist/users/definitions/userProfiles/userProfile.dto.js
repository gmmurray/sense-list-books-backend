"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchUserProfileDto = exports.CreateUserProfileDto = exports.QueryUserProfileDto = exports.UserProfileDto = void 0;
class UserProfileDto {
    constructor(authId, username, privateFields, createdAt, updatedAt) {
        this.authId = authId;
        this.username = username;
        this.privateFields = privateFields;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    isProfileOwner(userId) {
        return this.authId === userId;
    }
    hidePrivateFields(userId) {
        if (!this.isProfileOwner(userId))
            this.privateFields = undefined;
        return this;
    }
    static assign(doc) {
        return new UserProfileDto(doc.authId, doc.username, doc.privateFields, doc.createdAt, doc.updatedAt);
    }
}
exports.UserProfileDto = UserProfileDto;
class QueryUserProfileDto {
}
exports.QueryUserProfileDto = QueryUserProfileDto;
class CreateUserProfileDto {
    constructor(authId, username, privateFields) {
        this.authId = authId;
        this.username = username;
        this.privateFields = privateFields;
    }
}
exports.CreateUserProfileDto = CreateUserProfileDto;
class PatchUserProfileDto {
    constructor({ username = undefined, recentActivityCount = undefined, activeListsCount = undefined, showActivityOnPublicProfile = undefined, }) {
        this.username = username;
        this.recentActivityCount = recentActivityCount;
        this.activeListsCount = activeListsCount;
        this.showActivityOnPublicProfile = showActivityOnPublicProfile;
    }
}
exports.PatchUserProfileDto = PatchUserProfileDto;
//# sourceMappingURL=userProfile.dto.js.map