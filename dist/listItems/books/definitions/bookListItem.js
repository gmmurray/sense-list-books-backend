"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookListItemDomain = exports.BookListItemMeta = void 0;
const listItem_domain_1 = require("../../definitions/listItem.domain");
const list_schema_1 = require("../../../lists/definitions/list.schema");
const listType_1 = require("../../../common/types/listType");
const OpenLibraryBook_1 = require("../../../openLibrary/OpenLibraryBook");
const GoogleApiBook_1 = require("../../../googleBooks/GoogleApiBook");
class BookListItemMeta {
    constructor(title, subtitle, authors, publishedDate, description, pageCount, thumbnail_url, language, selfLink, identifiers) {
        this.title = title;
        this.subtitle = subtitle;
        this.authors = authors;
        this.publishedDate = publishedDate;
        this.description = description;
        this.pageCount = pageCount;
        this.thumbnail_url = thumbnail_url;
        this.language = language;
        this.selfLink = selfLink;
        this.identifiers = identifiers;
    }
    static create(googleVolume, openLibraryBook) {
        var _a, _b;
        const { selfLink, volumeInfo: { title, subtitle, authors, publishedDate, description, pageCount, imageLinks: { thumbnail }, language, }, } = googleVolume;
        let relevantIdentifiers = undefined;
        if ((_b = (_a = openLibraryBook === null || openLibraryBook === void 0 ? void 0 : openLibraryBook.details) === null || _a === void 0 ? void 0 : _a.identifiers) !== null && _b !== void 0 ? _b : false) {
            relevantIdentifiers = OpenLibraryBook_1.OpenLibraryBook.getRelevantIdentifiers(openLibraryBook.details.identifiers);
        }
        return new BookListItemMeta(title, subtitle, authors, publishedDate, description, pageCount, thumbnail, language, selfLink, relevantIdentifiers);
    }
}
exports.BookListItemMeta = BookListItemMeta;
class BookListItemDomain extends listItem_domain_1.ListItemDomain {
    constructor(isbn, volumeId, meta, list, ordinal) {
        super();
        this.listType = listType_1.ListType.Book;
        this.isbn = isbn;
        this.volumeId = volumeId;
        this.meta = meta;
        this.list = list;
        this.ordinal = ordinal;
    }
    static create(list, ordinal, googleVolume, openLibraryBook) {
        const meta = BookListItemMeta.create(googleVolume, openLibraryBook !== null && openLibraryBook !== void 0 ? openLibraryBook : null);
        const isbn = GoogleApiBook_1.GoogleApiBook.getIsbn(googleVolume.volumeInfo.industryIdentifiers);
        return new BookListItemDomain(isbn, googleVolume.id, meta, list, ordinal);
    }
}
exports.BookListItemDomain = BookListItemDomain;
//# sourceMappingURL=bookListItem.js.map