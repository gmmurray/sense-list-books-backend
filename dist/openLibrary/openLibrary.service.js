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
var OpenLibraryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenLibraryService = void 0;
const common_1 = require("@nestjs/common");
const responseWrappers_1 = require("../common/types/responseWrappers");
const axios_1 = require("axios");
const OpenLibrarySearch_1 = require("./OpenLibrarySearch");
let OpenLibraryService = OpenLibraryService_1 = class OpenLibraryService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getBookByIsbn(isbn) {
        const url = OpenLibraryService_1.generateRetrievalUrl(isbn);
        const book = await this.httpService.get(url).toPromise();
        return book.data[`ISBN:${isbn}`];
    }
    async searchBooks(searchOptions) {
        const url = OpenLibraryService_1.generateSearchUrl(searchOptions);
        const result = await axios_1.default.get(url);
        const items = result.data;
        return new responseWrappers_1.DataTotalResponse(items.docs
            .map((item) => new OpenLibrarySearch_1.OpenLibrarySearchItem(item))
            .filter(item => item.isbn !== null));
    }
    static generateRetrievalUrl(isbn) {
        return `${OpenLibraryService_1.base_book_retrieval_url}${isbn}`;
    }
    static generateSearchUrl(searchOptions) {
        const searchStringQuery = searchOptions.searchString
            ? `&q=${encodeURIComponent(searchOptions.searchString)}`
            : '';
        const titleQuery = searchOptions.title
            ? `&title=${encodeURIComponent(searchOptions.title)}`
            : '';
        const authorQuery = searchOptions.author
            ? `&author=${encodeURIComponent(searchOptions.author)}`
            : '';
        return `${this.base_search_url}limit=15${searchStringQuery}${titleQuery}${authorQuery}`;
    }
};
OpenLibraryService.base_book_retrieval_url = 'https://openlibrary.org/api/books?format=json&jscmd=details&bibkeys=ISBN:';
OpenLibraryService.base_search_url = 'https://openlibrary.org/search.json?';
OpenLibraryService = OpenLibraryService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], OpenLibraryService);
exports.OpenLibraryService = OpenLibraryService;
//# sourceMappingURL=openLibrary.service.js.map