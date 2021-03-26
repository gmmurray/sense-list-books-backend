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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ApiPermissions_1 = require("../authz/ApiPermissions");
const authzUser_1 = require("../authz/authzUser");
const permissions_decorator_1 = require("../authz/permissions.decorator");
const permissions_guard_1 = require("../authz/permissions.guard");
const responseWrappers_1 = require("../common/types/responseWrappers");
const userList_dto_1 = require("./definitions/userList.dto");
const userLists_service_1 = require("./userLists.service");
let UserListsController = class UserListsController {
    constructor(userListsService) {
        this.userListsService = userListsService;
    }
    async index({ user }) {
        const userId = user.sub;
        return await this.userListsService.findAll(userId);
    }
    async getPopulatedUserList({ user }, userListId) {
        const userId = user.sub;
        return await this.userListsService.getPopulatedUserList(userId, userListId);
    }
    async create({ user }, createDto) {
        const userId = user.sub;
        return await this.userListsService.create(userId, createDto);
    }
    async patch({ user }, userListId, updates) {
        const userId = user.sub;
        return await this.userListsService.patch(userId, userListId, new userList_dto_1.PatchUserListDto(updates));
    }
    async delete({ user }, userListId) {
        const userId = user.sub;
        return await this.userListsService.delete(userId, userListId);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListApiPermissions.read),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserListsController.prototype, "index", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(':userListId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListApiPermissions.read, ApiPermissions_1.ListApiPermissions.read, ApiPermissions_1.ListItemApiPermissions.read, ApiPermissions_1.UserListItemApiPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('userListId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserListsController.prototype, "getPopulatedUserList", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Post(),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userList_dto_1.CreateUserListDto]),
    __metadata("design:returntype", Promise)
], UserListsController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Patch(':userListId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('userListId')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, userList_dto_1.PatchUserListDto]),
    __metadata("design:returntype", Promise)
], UserListsController.prototype, "patch", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Delete(':userListId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListApiPermissions.delete, ApiPermissions_1.UserListItemApiPermissions.delete),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('userListId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserListsController.prototype, "delete", null);
UserListsController = __decorate([
    common_1.Controller('user-lists'),
    __metadata("design:paramtypes", [userLists_service_1.UserListsService])
], UserListsController);
exports.UserListsController = UserListsController;
//# sourceMappingURL=userLists.controller.js.map