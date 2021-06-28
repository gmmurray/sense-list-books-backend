"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchBULIDto = exports.CreateBULIDto = exports.BULIDto = void 0;
const mongoose_1 = require("mongoose");
const bookFormatType_1 = require("../../../common/types/bookFormatType");
const stringIdType_1 = require("../../../common/types/stringIdType");
const userListItemStatus_1 = require("../../../common/types/userListItemStatus");
const bookListItem_dto_1 = require("../../../listItems/books/definitions/bookListItem.dto");
const bookListItem_schema_1 = require("../../../listItems/books/definitions/bookListItem.schema");
const userListItem_dto_1 = require("../../definitions/userListItem.dto");
const userList_dto_1 = require("../../../userLists/definitions/userList.dto");
const userList_schema_1 = require("../../../userLists/definitions/userList.schema");
class BULIDto extends userListItem_dto_1.UserListItemDto {
    constructor(bookListItem, status, owned, baseProperties, format, rating) {
        super();
        this.bookListItem = bookListItem;
        this.status = status;
        this.owned = owned;
        this.format = format;
        this.rating = rating;
        this.id = baseProperties.id;
        this.userList = baseProperties.userList;
        this.userId = baseProperties.userId;
        this.notes = baseProperties.notes;
        this.createdAt = baseProperties.createdAt;
        this.updatedAt = baseProperties.updatedAt;
    }
    static assign(doc) {
        let subBookListItem;
        if (doc.bookListItem && doc.bookListItem instanceof mongoose_1.Document) {
            subBookListItem = bookListItem_dto_1.BookListItemDto.assign(doc.bookListItem);
        }
        let subUserList;
        if (doc.userList && doc.userList instanceof mongoose_1.Document) {
            subUserList = userList_dto_1.UserListDto.assign(doc.userList);
        }
        return new BULIDto(subBookListItem || doc.bookListItem, doc.status, doc.owned, {
            id: doc._id,
            userList: subUserList || doc.userList,
            userId: doc.userId,
            notes: doc.notes,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }, doc.owned ? doc.format : null, doc.rating);
    }
    static assignWithPopulatedDocuments(doc) {
        return new BULIDto(bookListItem_dto_1.BookListItemDto.assign(doc.bookListItem), doc.status, doc.owned, {
            id: doc._id,
            userList: userList_dto_1.UserListDto.assign(doc.userList),
            userId: doc.userId,
            notes: doc.notes,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }, doc.owned ? doc.format : null, doc.rating);
    }
    static assignWithPopulatedListItemsOnly(doc) {
        let subUserList;
        if (doc.userList && doc.userList instanceof mongoose_1.Document) {
            subUserList = userList_dto_1.UserListDto.assign(doc.userList);
        }
        return new BULIDto(bookListItem_dto_1.BookListItemDto.assign(doc.bookListItem), doc.status, doc.owned, {
            id: doc._id,
            userList: subUserList || doc.userList,
            userId: doc.userId,
            notes: doc.notes,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        }, doc.owned ? doc.format : null, doc.rating);
    }
}
exports.BULIDto = BULIDto;
class CreateBULIDto {
    constructor(userList, userId, bookListItem, status, owned, rating, notes, format) {
        this.userList = userList;
        this.userId = userId;
        this.bookListItem = bookListItem;
        this.status = status;
        this.owned = owned;
        this.rating = rating;
        this.notes = notes;
        this.format = format;
    }
}
exports.CreateBULIDto = CreateBULIDto;
class PatchBULIDto {
    constructor({ notes = undefined, status = undefined, owned = undefined, rating = undefined, format = undefined, }) {
        this.notes = notes;
        this.status = status;
        this.owned = owned;
        this.rating = rating;
        this.format = format;
    }
}
exports.PatchBULIDto = PatchBULIDto;
//# sourceMappingURL=buli.dto.js.map