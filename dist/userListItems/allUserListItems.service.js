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
exports.AllUserListItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const listType_1 = require("../common/types/listType");
const mongooseTableHelpers_1 = require("../common/mongooseTableHelpers");
const buli_service_1 = require("./books/buli.service");
const bookUserListItem_schema_1 = require("./books/definitions/bookUserListItem.schema");
const stringIdType_1 = require("../common/types/stringIdType");
let AllUserListItemsService = class AllUserListItemsService {
    constructor(bookItems, bookService) {
        this.bookItems = bookItems;
        this.bookService = bookService;
    }
    async deleteAllUserItemsBySingleListItem(userId, listItemId, listType, session) {
        let service;
        let itemField;
        switch (listType) {
            case listType_1.ListType.Book:
                service = this.bookService;
                itemField = mongooseTableHelpers_1.getMultiUserListItemPropName(listType);
                break;
            default:
                throw new common_1.NotImplementedException();
        }
        const affectedUserItems = await service.findAllBySingleListItemWithoutUser(listItemId);
        await service.deleteAllUserItemsByIds(userId, affectedUserItems.map(doc => doc._id), itemField, session);
    }
    async deleteAllUserItemsByListItems(userId, listItemIds, listType, session) {
        let service;
        let itemField;
        switch (listType) {
            case listType_1.ListType.Book:
                service = this.bookService;
                itemField = mongooseTableHelpers_1.getMultiUserListItemPropName(listType);
                break;
            default:
                throw new common_1.NotImplementedException();
        }
        const affectedUserItems = await service.findAllByListItemsWithoutUser(listItemIds);
        await service.deleteAllUserItemsByIds(userId, affectedUserItems.map(doc => doc._id), itemField, session);
    }
    async deleteAllUserItemsByUserList(userListId, listType, session) {
        let service;
        switch (listType) {
            case listType_1.ListType.Book:
                service = this.bookService;
                break;
            default:
                throw new common_1.NotImplementedException();
        }
        await service.deleteAllUserItemsByUserList(userListId, session);
    }
};
AllUserListItemsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(bookUserListItem_schema_1.BookUserListItem.name)),
    __param(1, common_1.Inject(common_1.forwardRef(() => buli_service_1.BULIService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        buli_service_1.BULIService])
], AllUserListItemsService);
exports.AllUserListItemsService = AllUserListItemsService;
//# sourceMappingURL=allUserListItems.service.js.map