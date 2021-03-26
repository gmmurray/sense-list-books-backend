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
exports.BookUsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ApiPermissions_1 = require("../../authz/ApiPermissions");
const authzUser_1 = require("../../authz/authzUser");
const permissions_decorator_1 = require("../../authz/permissions.decorator");
const permissions_guard_1 = require("../../authz/permissions.guard");
const responseWrappers_1 = require("../../common/types/responseWrappers");
const userList_dto_1 = require("../../userLists/definitions/userList.dto");
const bookUsers_service_1 = require("./bookUsers.service");
let BookUsersController = class BookUsersController {
    constructor(bookUsersService) {
        this.bookUsersService = bookUsersService;
    }
    async getRecentActivity({ user }, count) {
        const userId = user.sub;
        return await this.bookUsersService.getRecentActivity(userId, count);
    }
    async getActiveLists({ user }, count) {
        const userId = user.sub;
        return await this.bookUsersService.getActiveLists(userId, count);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get('activity/:count'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookUsersController.prototype, "getRecentActivity", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get('active-lists/:count'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookUsersController.prototype, "getActiveLists", null);
BookUsersController = __decorate([
    common_1.Controller('books/users'),
    __metadata("design:paramtypes", [bookUsers_service_1.BookUsersService])
], BookUsersController);
exports.BookUsersController = BookUsersController;
//# sourceMappingURL=bookUsers.controller.js.map