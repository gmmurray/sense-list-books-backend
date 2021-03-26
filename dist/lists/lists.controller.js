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
exports.ListsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ApiPermissions_1 = require("../authz/ApiPermissions");
const authzUser_1 = require("../authz/authzUser");
const permissions_decorator_1 = require("../authz/permissions.decorator");
const permissions_guard_1 = require("../authz/permissions.guard");
const list_dto_1 = require("./definitions/list.dto");
const lists_service_1 = require("./lists.service");
let ListsController = class ListsController {
    constructor(listsService) {
        this.listsService = listsService;
    }
    async index({ user }, query) {
        const userId = user.sub;
        if (query) {
            return this.listsService.findByQuery(new list_dto_1.QueryListDto(query), userId);
        }
        return await this.listsService.findAll(userId);
    }
    async getById({ user }, id) {
        const userId = user.sub;
        return await this.listsService.findById(id, userId);
    }
    async create({ user }, createListDto) {
        const userId = user.sub;
        return await this.listsService.create(createListDto, userId);
    }
    async patch({ user }, id, updates) {
        const userId = user.sub;
        return await this.listsService.patch(id, new list_dto_1.PatchListDto(updates), userId);
    }
    async delete({ user }, id) {
        const userId = user.sub;
        return await this.listsService.delete(id, userId);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListApiPermissions.read),
    __param(0, common_1.Req()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "index", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(':id'),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListApiPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "getById", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Post(),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, list_dto_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Patch(':id'),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, list_dto_1.PatchListDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "patch", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Delete(':id'),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListApiPermissions.delete, ApiPermissions_1.ListItemApiPermissions.delete, ApiPermissions_1.UserListApiPermissions.delete, ApiPermissions_1.UserListItemApiPermissions.delete),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "delete", null);
ListsController = __decorate([
    common_1.Controller('lists'),
    __metadata("design:paramtypes", [lists_service_1.ListsService])
], ListsController);
exports.ListsController = ListsController;
//# sourceMappingURL=lists.controller.js.map