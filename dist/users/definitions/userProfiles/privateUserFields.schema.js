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
exports.PrivateUserFields = exports.defaultPubliclyShowUserStatistics = exports.defaultShowActivityOnPublicProfile = exports.defaultActiveListsCount = exports.defaultRecentActivityCount = void 0;
const mongoose_1 = require("@nestjs/mongoose");
exports.defaultRecentActivityCount = 5;
exports.defaultActiveListsCount = 3;
exports.defaultShowActivityOnPublicProfile = false;
exports.defaultPubliclyShowUserStatistics = true;
let PrivateUserFields = class PrivateUserFields {
};
__decorate([
    mongoose_1.Prop({ default: exports.defaultRecentActivityCount }),
    __metadata("design:type", Number)
], PrivateUserFields.prototype, "recentActivityCount", void 0);
__decorate([
    mongoose_1.Prop({ default: exports.defaultActiveListsCount }),
    __metadata("design:type", Number)
], PrivateUserFields.prototype, "activeListsCount", void 0);
__decorate([
    mongoose_1.Prop({ default: exports.defaultShowActivityOnPublicProfile }),
    __metadata("design:type", Boolean)
], PrivateUserFields.prototype, "showActivityOnPublicProfile", void 0);
__decorate([
    mongoose_1.Prop({ default: exports.defaultPubliclyShowUserStatistics }),
    __metadata("design:type", Boolean)
], PrivateUserFields.prototype, "publiclyShowUserStatistics", void 0);
PrivateUserFields = __decorate([
    mongoose_1.Schema()
], PrivateUserFields);
exports.PrivateUserFields = PrivateUserFields;
//# sourceMappingURL=privateUserFields.schema.js.map