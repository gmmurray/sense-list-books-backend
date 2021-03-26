"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleApiBook = exports.GoogleApiBookVolumeInfo = exports.GoogleApiIndustryIdentifier = exports.GoogleApiIndustryIdentifierType = exports.GoogleApiImageLinks = void 0;
class GoogleApiImageLinks {
    constructor(smallThumbnail, thumbnail) {
        this.smallThumbnail = smallThumbnail;
        this.thumbnail = thumbnail;
    }
}
exports.GoogleApiImageLinks = GoogleApiImageLinks;
var GoogleApiIndustryIdentifierType;
(function (GoogleApiIndustryIdentifierType) {
    GoogleApiIndustryIdentifierType["isbn10"] = "ISBN_10";
    GoogleApiIndustryIdentifierType["isbn13"] = "ISBN_13";
    GoogleApiIndustryIdentifierType["issn"] = "ISSN";
    GoogleApiIndustryIdentifierType["other"] = "OTHER";
})(GoogleApiIndustryIdentifierType = exports.GoogleApiIndustryIdentifierType || (exports.GoogleApiIndustryIdentifierType = {}));
class GoogleApiIndustryIdentifier {
    constructor(type, identifier) {
        this.type = type;
        this.identifier = identifier;
    }
}
exports.GoogleApiIndustryIdentifier = GoogleApiIndustryIdentifier;
class GoogleApiBookVolumeInfo {
    constructor(title, subtitle, authors, publishedDate, description, industryIdentifiers, pageCount, imageLinks, language) {
        this.title = title;
        this.subtitle = subtitle;
        this.authors = authors;
        this.publishedDate = publishedDate;
        this.description = description;
        this.industryIdentifiers = industryIdentifiers;
        this.pageCount = pageCount;
        this.imageLinks = imageLinks;
        this.language = language;
    }
}
exports.GoogleApiBookVolumeInfo = GoogleApiBookVolumeInfo;
class GoogleApiBook {
    constructor(id, selfLink, volumeInfo) {
        this.id = id;
        this.selfLink = selfLink;
        this.volumeInfo = volumeInfo;
    }
    static getIsbn(industryIdentifiers) {
        let hasIsbn13 = false;
        let isbn = 'none';
        if (industryIdentifiers) {
            industryIdentifiers.forEach(identifier => {
                if (identifier.type === GoogleApiIndustryIdentifierType.isbn13) {
                    hasIsbn13 = true;
                    isbn = identifier.identifier;
                    return;
                }
                else if (identifier.type === GoogleApiIndustryIdentifierType.isbn10 &&
                    !hasIsbn13) {
                    isbn = identifier.identifier;
                    return;
                }
            });
        }
        return isbn;
    }
    static trimFieldsFromSearchResponse(responseItem) {
        const { id, selfLink, volumeInfo: { title, subtitle, authors, publishedDate, description, industryIdentifiers, pageCount, imageLinks, language, }, } = responseItem;
        return new GoogleApiBook(id, selfLink, {
            title,
            subtitle,
            authors,
            publishedDate,
            description,
            industryIdentifiers,
            pageCount,
            imageLinks,
            language,
        });
    }
}
exports.GoogleApiBook = GoogleApiBook;
//# sourceMappingURL=GoogleApiBook.js.map