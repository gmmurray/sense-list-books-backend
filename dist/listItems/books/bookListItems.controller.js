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
exports.BookListItemsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ApiPermissions_1 = require("../../authz/ApiPermissions");
const authzUser_1 = require("../../authz/authzUser");
const permissions_decorator_1 = require("../../authz/permissions.decorator");
const permissions_guard_1 = require("../../authz/permissions.guard");
const responseWrappers_1 = require("../../common/types/responseWrappers");
const listItem_dto_1 = require("../definitions/listItem.dto");
const bookListItem_service_1 = require("./bookListItem.service");
const bookListItem_dto_1 = require("./definitions/bookListItem.dto");
let BookListItemsController = class BookListItemsController {
    constructor(bookListItemsService) {
        this.bookListItemsService = bookListItemsService;
    }
    async index({ user }, query) {
        const userId = user.sub;
        if (Object.keys(query).length > 1) {
            return this.bookListItemsService.findByQuery(userId, query.list, new bookListItem_dto_1.QueryBookListItemDto(query));
        }
        return await this.bookListItemsService.findAll(userId, query.list);
    }
    async getById({ user }, listItemId) {
        const userId = user.sub;
        return await this.bookListItemsService.findById(userId, listItemId);
    }
    async create({ user }, createListItemDto) {
        const userId = user.sub;
        return await this.bookListItemsService.create(createListItemDto, userId);
    }
    async updateOrdinals({ user }, updates) {
        const userId = user.sub;
        return await this.bookListItemsService.updateListItemOrdinals(userId, updates);
    }
    async patch({ user }, listItemId, updates) {
        const userId = user.sub;
        return await this.bookListItemsService.patch(userId, listItemId, new bookListItem_dto_1.PatchBookListItemDto(updates));
    }
    async delete({ user }, listItemId) {
        const userId = user.sub;
        return await this.bookListItemsService.delete(userId, listItemId);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListItemApiPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bookListItem_dto_1.QueryBookListItemDto]),
    __metadata("design:returntype", Promise)
], BookListItemsController.prototype, "index", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Get(':listItemId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListItemApiPermissions.read),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('listItemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookListItemsController.prototype, "getById", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Post(),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListItemApiPermissions.write, ApiPermissions_1.ListApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bookListItem_dto_1.CreateBookListItemDto]),
    __metadata("design:returntype", Promise)
], BookListItemsController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Post('/updateOrdinals'),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListItemApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, listItem_dto_1.UpdateListItemOrdinalsDto]),
    __metadata("design:returntype", Promise)
], BookListItemsController.prototype, "updateOrdinals", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Patch(':listItemId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListItemApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('listItemId')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, bookListItem_dto_1.PatchBookListItemDto]),
    __metadata("design:returntype", Promise)
], BookListItemsController.prototype, "patch", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Delete(':listItemId'),
    permissions_decorator_1.Permissions(ApiPermissions_1.ListItemApiPermissions.delete, ApiPermissions_1.ListApiPermissions.write, ApiPermissions_1.UserListItemApiPermissions.delete, ApiPermissions_1.UserListApiPermissions.write),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('listItemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookListItemsController.prototype, "delete", null);
BookListItemsController = __decorate([
    common_1.Controller('books/list-items'),
    __metadata("design:paramtypes", [bookListItem_service_1.BookListItemsService])
], BookListItemsController);
exports.BookListItemsController = BookListItemsController;
//# sourceMappingURL=bookListItems.controller.js.map