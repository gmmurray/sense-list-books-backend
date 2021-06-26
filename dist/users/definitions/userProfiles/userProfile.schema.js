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
exports.UserProfileSchema = exports.UserProfile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongooseTableHelpers_1 = require("../../../common/mongooseTableHelpers");
const privateUserFields_schema_1 = require("./privateUserFields.schema");
let UserProfile = class UserProfile {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "authId", void 0);
__decorate([
    mongoose_1.Prop({ default: 'Anonymous' }),
    __metadata("design:type", String)
], UserProfile.prototype, "username", void 0);
__decorate([
    mongoose_1.Prop({ type: privateUserFields_schema_1.PrivateUserFields, default: new privateUserFields_schema_1.PrivateUserFields() }),
    __metadata("design:type", privateUserFields_schema_1.PrivateUserFields)
], UserProfile.prototype, "privateFields", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], UserProfile.prototype, "pinnedListId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], UserProfile.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], UserProfile.prototype, "updatedAt", void 0);
UserProfile = __decorate([
    mongoose_1.Schema({ timestamps: true })
], UserProfile);
exports.UserProfile = UserProfile;
exports.UserProfileSchema = mongoose_1.SchemaFactory.createForClass(UserProfile);
exports.UserProfileSchema.virtual('listCount', {
    ref: mongooseTableHelpers_1.getListModelName(),
    localField: 'authId',
    foreignField: 'ownerId',
    count: true,
});
//# sourceMappingURL=userProfile.schema.js.map