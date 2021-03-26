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
exports.UserListSchema = exports.UserList = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const list_schema_1 = require("../../lists/definitions/list.schema");
const bookUserListItem_schema_1 = require("../../userListItems/books/definitions/bookUserListItem.schema");
let UserList = class UserList {
};
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'List' }),
    __metadata("design:type", Object)
], UserList.prototype, "list", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], UserList.prototype, "userId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], UserList.prototype, "notes", void 0);
__decorate([
    mongoose_1.Prop({ type: [mongoose_2.Types.ObjectId], ref: 'BookUserListItem' }),
    __metadata("design:type", Array)
], UserList.prototype, "bookUserListItems", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], UserList.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], UserList.prototype, "updatedAt", void 0);
UserList = __decorate([
    mongoose_1.Schema({ timestamps: true })
], UserList);
exports.UserList = UserList;
exports.UserListSchema = mongoose_1.SchemaFactory.createForClass(UserList);
//# sourceMappingURL=userList.schema.js.map