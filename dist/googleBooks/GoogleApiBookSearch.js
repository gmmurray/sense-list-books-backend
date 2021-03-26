"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleApiBookSearchResponse = exports.GoogleApiBookSearchOptions = exports.GoogleApiBookSearchWithin = void 0;
var GoogleApiBookSearchWithin;
(function (GoogleApiBookSearchWithin) {
    GoogleApiBookSearchWithin["author"] = "author";
    GoogleApiBookSearchWithin["title"] = "title";
    GoogleApiBookSearchWithin["none"] = "none";
})(GoogleApiBookSearchWithin = exports.GoogleApiBookSearchWithin || (exports.GoogleApiBookSearchWithin = {}));
class GoogleApiBookSearchOptions {
    constructor(searchString, startIndex, maxResults, orderBy, searchWithin) {
        this.searchString = searchString;
        this.startIndex = startIndex;
        this.maxResults = maxResults;
        this.orderBy = orderBy;
        this.searchWithin = searchWithin;
    }
}
exports.GoogleApiBookSearchOptions = GoogleApiBookSearchOptions;
class GoogleApiBookSearchResponse {
    constructor(kind, totalItems, items) {
        this.kind = kind;
        this.totalItems = totalItems;
        this.items = items;
    }
}
exports.GoogleApiBookSearchResponse = GoogleApiBookSearchResponse;
//# sourceMappingURL=GoogleApiBookSearch.js.map