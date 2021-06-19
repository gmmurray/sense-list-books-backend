"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateUserFieldsDto = void 0;
const privateUserFields_schema_1 = require("./privateUserFields.schema");
class PrivateUserFieldsDto {
    constructor(recentActivityCount = privateUserFields_schema_1.defaultRecentActivityCount, activeListsCount = privateUserFields_schema_1.defaultActiveListsCount, showActivityOnPublicProfile = privateUserFields_schema_1.defaultShowActivityOnPublicProfile) {
        this.recentActivityCount = recentActivityCount;
        this.activeListsCount = activeListsCount;
        this.showActivityOnPublicProfile = showActivityOnPublicProfile;
    }
}
exports.PrivateUserFieldsDto = PrivateUserFieldsDto;
//# sourceMappingURL=privateUserFields.dto.js.map