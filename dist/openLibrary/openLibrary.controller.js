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
exports.OpenLibraryController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ApiPermissions_1 = require("../authz/ApiPermissions");
const permissions_decorator_1 = require("../authz/permissions.decorator");
const permissions_guard_1 = require("../authz/permissions.guard");
const responseWrappers_1 = require("../common/types/responseWrappers");
const openLibrary_service_1 = require("./openLibrary.service");
const OpenLibrarySearch_1 = require("./OpenLibrarySearch");
let OpenLibraryController = class OpenLibraryController {
    constructor(openLibraryService) {
        this.openLibraryService = openLibraryService;
    }
    async search(searchOptions) {
        return await this.openLibraryService.searchBooks(searchOptions);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt'), permissions_guard_1.PermissionsGuard),
    common_1.Post(),
    common_1.HttpCode(200),
    permissions_decorator_1.Permissions(ApiPermissions_1.OpenLibraryApiPermissions.read),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OpenLibrarySearch_1.OpenLibrarySearchOptions]),
    __metadata("design:returntype", Promise)
], OpenLibraryController.prototype, "search", null);
OpenLibraryController = __decorate([
    common_1.Controller('books/open-library'),
    __metadata("design:paramtypes", [openLibrary_service_1.OpenLibraryService])
], OpenLibraryController);
exports.OpenLibraryController = OpenLibraryController;
//# sourceMappingURL=openLibrary.controller.js.map