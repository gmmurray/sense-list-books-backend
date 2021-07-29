"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchListDto = exports.CreateListDto = exports.QueryListDto = exports.ListDto = void 0;
const mongoose_1 = require("mongoose");
const bookListItem_dto_1 = require("../../listItems/books/definitions/bookListItem.dto");
const bookListItem_schema_1 = require("../../listItems/books/definitions/bookListItem.schema");
class ListDto {
    constructor(id, isPublic, title, description, type, category, ownerId, createdAt, updatedAt, bookListItems) {
        this.id = id;
        this.isPublic = isPublic;
        this.title = title;
        this.description = description;
        this.type = type;
        this.category = category;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.bookListItems = bookListItems;
    }
    static assign(doc) {
        let subBookListItems;
        if (doc.bookListItems &&
            doc.bookListItems.length &&
            doc.bookListItems.every(item => item instanceof mongoose_1.Document)) {
            subBookListItems = doc.bookListItems.map(item => bookListItem_dto_1.BookListItemDto.assign(item));
        }
        return new ListDto(doc._id, doc.isPublic, doc.title, doc.description, doc.type, doc.category, doc.ownerId, doc.createdAt, doc.updatedAt, subBookListItems || doc.bookListItems);
    }
}
exports.ListDto = ListDto;
class QueryListDto {
    constructor({ title = undefined, description = undefined, category = undefined, type = undefined, ownerOnly = undefined, ownerId = undefined, }) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.type = type;
        this.ownerOnly = ownerOnly;
        this.ownerId = ownerId;
    }
}
exports.QueryListDto = QueryListDto;
class CreateListDto {
    constructor(isPublic, title, description, type, category) {
        this.isPublic = isPublic;
        this.title = title;
        this.description = description;
        this.type = type;
        this.category = category;
    }
}
exports.CreateListDto = CreateListDto;
class PatchListDto {
    constructor({ isPublic = undefined, title = undefined, description = undefined, category = undefined, }) {
        this.isPublic = isPublic;
        this.title = title;
        this.description = description;
        this.category = category;
    }
}
exports.PatchListDto = PatchListDto;
//# sourceMappingURL=list.dto.js.map