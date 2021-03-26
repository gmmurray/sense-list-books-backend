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
exports.BULIController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ApiPermissions_1 = require("../../authz/ApiPermissions");
const authzUser_1 = require("../../authz/authzUser");
const permissions_decorator_1 = require("../../authz/permissions.decorator");
const permissions_guard_1 = require("../../authz/permissions.guard");
const responseWrappers_1 = require("../../common/types/responseWrappers");
const buli_service_1 = require("./buli.service");
const buli_dto_1 = require("./definitions/buli.dto");
let BULIController = class BULIController {
    constructor(buliService) {
        this.buliService = buliService;
    }
    async index({ user }, query) {
        const userId = user.sub;
        if (query.userListId) {
            return await this.buliService.findAllByUserList(userId, query.userListId);
        }
        else
            return await this.buliService.findAll(userId);
    }
    async getById({ user }, buliId) {
        const userId = user.sub;
        return await this.buliService.findById(userId, buliId);
    }
    async create({ user }, createDto) {
        const userId = user.sub;
        return await this.buliService.create(userId, createDto);
    }
    async patch({ user }, buliId, updates) {
        const userId = user.sub;
        return await this.buliService.patch(userId, buliId, new buli_dto_1.PatchBULIDto(updates));
    }
    async delete({ user }, buliId) {
        const userId = user.sub;
        return await this.buliService.delete(userId, buliId);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListApiPermissions.read, ApiPermissions_1.UserListItemApiPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BULIController.prototype, "index", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(':buliId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListItemApiPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('buliId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BULIController.prototype, "getById", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Post(),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListApiPermissions.write, ApiPermissions_1.UserListItemApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, buli_dto_1.CreateBULIDto]),
    __metadata("design:returntype", Promise)
], BULIController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Patch(':buliId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListItemApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('buliId')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, buli_dto_1.PatchBULIDto]),
    __metadata("design:returntype", Promise)
], BULIController.prototype, "patch", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Delete(':buliId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.UserListItemApiPermissions.delete),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('buliId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BULIController.prototype, "delete", null);
BULIController = __decorate([
    common_2.Controller('books/user-list-items'),
    __metadata("design:paramtypes", [buli_service_1.BULIService])
], BULIController);
exports.BULIController = BULIController;
//# sourceMappingURL=buli.controller.js.map