"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenLibraryBook = exports.OpenLibraryBookDetails = exports.OpenLibraryBookIdentifier = exports.OpenLibraryBookAuthor = void 0;
class OpenLibraryBookAuthor {
    constructor(name, key) {
        this.name = name;
        this.key = key;
    }
}
exports.OpenLibraryBookAuthor = OpenLibraryBookAuthor;
class OpenLibraryBookIdentifier {
}
exports.OpenLibraryBookIdentifier = OpenLibraryBookIdentifier;
class OpenLibraryBookDetails {
}
exports.OpenLibraryBookDetails = OpenLibraryBookDetails;
class OpenLibraryBook {
    constructor(bib_key, thumbnail_url, details) {
        this.bib_key = bib_key;
        this.thumbnail_url = thumbnail_url;
        this.details = details;
    }
    static getNormalizedAuthors(authors) {
        return authors.map(kvp => kvp.name);
    }
    static getRelevantIdentifiers(identifiers) {
        const relevantIdentifiers = {};
        Object.keys(identifiers)
            .filter(key => key === 'goodreads' || key === 'amazon')
            .forEach(key => {
            relevantIdentifiers[key] = identifiers[key][0];
        });
        return relevantIdentifiers;
    }
}
exports.OpenLibraryBook = OpenLibraryBook;
//# sourceMappingURL=OpenLibraryBook.js.map