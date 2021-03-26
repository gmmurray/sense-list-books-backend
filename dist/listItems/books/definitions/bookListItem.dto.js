"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchBookListItemDto = exports.CreateBookListItemDto = exports.QueryBookListItemDto = exports.BookListItemDto = void 0;
const mongoose_1 = require("mongoose");
const listItem_dto_1 = require("../../definitions/listItem.dto");
const listType_1 = require("../../../common/types/listType");
const list_dto_1 = require("../../../lists/definitions/list.dto");
class BookListItemDto extends listItem_dto_1.ListItemDto {
    constructor(isbn, volumeId, meta, baseProperties) {
        super();
        this.isbn = isbn;
        this.volumeId = volumeId;
        this.meta = meta;
        this.id = baseProperties.id;
        this.list = baseProperties.list;
        this.listType = baseProperties.listType;
        this.ordinal = baseProperties.ordinal;
        this.createdAt = baseProperties.createdAt;
        this.updatedAt = baseProperties.updatedAt;
    }
    static assign(doc) {
        let subList;
        if (doc.list && doc.list instanceof mongoose_1.Document) {
            subList = list_dto_1.ListDto.assign(doc.list);
        }
        return new BookListItemDto(doc.isbn, doc.volumeId, Object.assign({}, doc.meta), {
            id: doc._id,
            list: subList || doc.list,
            listType: doc.listType,
            ordinal: doc.ordinal,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        });
    }
}
exports.BookListItemDto = BookListItemDto;
class QueryBookListItemDto {
    constructor({ ordinal = undefined, listType = undefined, title = undefined, description = undefined, author = undefined, }) {
        this.ordinal = ordinal;
        this.listType = listType;
        this.title = title;
        this.description = description;
        this.author = author;
    }
}
exports.QueryBookListItemDto = QueryBookListItemDto;
class CreateBookListItemDto {
    constructor(list, volumeId, ordinal) {
        this.list = list;
        this.volumeId = volumeId;
        this.ordinal = ordinal;
    }
}
exports.CreateBookListItemDto = CreateBookListItemDto;
class PatchBookListItemDto {
    constructor({ ordinal = undefined }) {
        this.ordinal = ordinal;
    }
}
exports.PatchBookListItemDto = PatchBookListItemDto;
//# sourceMappingURL=bookListItem.dto.js.map