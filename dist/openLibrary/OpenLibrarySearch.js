"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenLibrarySearchOptions = exports.OpenLibrarySearchItem = exports.OpenLibrarySearchResponse = exports.OpenLibrarySearchResponseItem = void 0;
const getThumbnailUrl = (id) => {
    return `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
};
class OpenLibrarySearchResponseItem {
    constructor(cover_i, title, edition_count, first_publish_year, author_name, isbn, language) {
        this.cover_i = cover_i;
        this.title = title;
        this.edition_count = edition_count;
        this.first_publish_year = first_publish_year;
        this.author_name = author_name;
        this.isbn = isbn;
        this.language = language;
    }
}
exports.OpenLibrarySearchResponseItem = OpenLibrarySearchResponseItem;
class OpenLibrarySearchResponse {
}
exports.OpenLibrarySearchResponse = OpenLibrarySearchResponse;
class OpenLibrarySearchItem {
    constructor({ cover_i, title, edition_count, first_publish_year, author_name, isbn, language, }) {
        this.thumbnail_url = cover_i ? getThumbnailUrl(cover_i) : null;
        this.title = title;
        this.edition_count = edition_count;
        this.first_publish_year = first_publish_year;
        this.authors = author_name;
        this.isbn = isbn ? isbn[0] : null;
        this.language = language;
    }
}
exports.OpenLibrarySearchItem = OpenLibrarySearchItem;
class OpenLibrarySearchOptions {
    constructor(searchString, title, author) {
        this.searchString = searchString;
        this.title = title;
        this.author = author;
    }
}
exports.OpenLibrarySearchOptions = OpenLibrarySearchOptions;
//# sourceMappingURL=OpenLibrarySearch.js.map