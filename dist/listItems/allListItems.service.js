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
exports.AllListItemsService = void 0;
const common_1 = require("@nestjs/common");
const listType_1 = require("../common/types/listType");
const stringIdType_1 = require("../common/types/stringIdType");
const bookListItem_service_1 = require("./books/bookListItem.service");
let AllListItemsService = class AllListItemsService {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async deleteAllItemsByList(userId, listId, listType, session) {
        let service;
        switch (listType) {
            case listType_1.ListType.Book:
                service = this.bookService;
                break;
            default:
                throw new common_1.NotImplementedException();
        }
        await service.deleteAllItemsByList(userId, listId, session, listType);
    }
};
AllListItemsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => bookListItem_service_1.BookListItemsService))),
    __metadata("design:paramtypes", [bookListItem_service_1.BookListItemsService])
], AllListItemsService);
exports.AllListItemsService = AllListItemsService;
//# sourceMappingURL=allListItems.service.js.map