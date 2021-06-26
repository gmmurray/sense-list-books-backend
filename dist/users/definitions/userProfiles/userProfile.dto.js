"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchUserProfileDto = exports.CreateUserProfileDto = exports.QueryUserProfileDto = exports.UserProfileDto = void 0;
class UserProfileDto {
    constructor(authId, username, privateFields, pinnedListId, listCount, createdAt, updatedAt, recentActivity) {
        this.authId = authId;
        this.username = username;
        this.privateFields = privateFields;
        this.pinnedListId = pinnedListId;
        this.listCount = listCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.recentActivity = recentActivity;
    }
    isProfileOwner(userId) {
        return this.authId === userId;
    }
    hidePrivateFields(userId) {
        if (!this.isProfileOwner(userId)) {
            this.privateFields = undefined;
            this.recentActivity = [];
        }
        return this;
    }
    static assign(doc, recentActivity) {
        return new UserProfileDto(doc.authId, doc.username, doc.privateFields, doc.pinnedListId, doc.listCount, doc.createdAt, doc.updatedAt, recentActivity);
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
    constructor({ username = undefined, pinnedListId = undefined, recentActivityCount = undefined, activeListsCount = undefined, showActivityOnPublicProfile = undefined, }) {
        this.username = username;
        this.pinnedListId = pinnedListId;
        this.recentActivityCount = recentActivityCount;
        this.activeListsCount = activeListsCount;
        this.showActivityOnPublicProfile = showActivityOnPublicProfile;
    }
}
exports.PatchUserProfileDto = PatchUserProfileDto;
//# sourceMappingURL=userProfile.dto.js.map