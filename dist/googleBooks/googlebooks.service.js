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
var GoogleBooksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBooksService = void 0;
const common_1 = require("@nestjs/common");
const exceptionWrappers_1 = require("../common/exceptionWrappers");
const responseWrappers_1 = require("../common/types/responseWrappers");
const GoogleApiBook_1 = require("./GoogleApiBook");
const GoogleApiBookSearch_1 = require("./GoogleApiBookSearch");
let GoogleBooksService = GoogleBooksService_1 = class GoogleBooksService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getBookByVolumeId(volumeId) {
        const url = GoogleBooksService_1.generateRetrievalUrl(volumeId);
        const result = await this.httpService.get(url).toPromise();
        return result.data;
    }
    async searchBooks(searchOptions) {
        var _a, _b, _c;
        try {
            const url = GoogleBooksService_1.generateSearchUrl(searchOptions);
            const result = await this.httpService.get(url).toPromise();
            const data = result.data;
            const items = (_b = (_a = data === null || data === void 0 ? void 0 : data.items) === null || _a === void 0 ? void 0 : _a.map(item => GoogleApiBook_1.GoogleApiBook.trimFieldsFromSearchResponse(item))) !== null && _b !== void 0 ? _b : [];
            const total = (_c = data === null || data === void 0 ? void 0 : data.totalItems) !== null && _c !== void 0 ? _c : 0;
            return new responseWrappers_1.DataTotalResponse(items, total);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('There was an error with Google Books API');
        }
    }
    static generateRetrievalUrl(volumeId) {
        return `${this.base_url}/${volumeId}?apiKey=${process.env.GOOGLE_BOOKS_API_KEY}`;
    }
    static generateSearchUrl(searchOptions) {
        const { startIndex = 0, maxResults = 10, orderBy = 'relevance', searchString, searchWithin = GoogleApiBookSearch_1.GoogleApiBookSearchWithin.none, } = searchOptions;
        const prequery = this.getSearchWithinClause(searchWithin);
        const formattedString = searchString.replace(/\s/g, '+');
        const params = {
            startIndex,
            maxResults,
            orderBy,
            q: prequery + formattedString,
        };
        return `${this.base_url}?${this.generateQueryString(params)}&printType=books&apiKey=${process.env.GOOGLE_BOOKS_API_KEY}`;
    }
    static generateQueryString(params) {
        return Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&');
    }
    static getSearchWithinClause(searchWithin) {
        switch (searchWithin) {
            case GoogleApiBookSearch_1.GoogleApiBookSearchWithin.author:
                return 'inauthor:';
            case GoogleApiBookSearch_1.GoogleApiBookSearchWithin.title:
                return 'intitle:';
            default:
                return '';
        }
    }
};
GoogleBooksService.base_url = 'https://www.googleapis.com/books/v1/volumes';
GoogleBooksService = GoogleBooksService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], GoogleBooksService);
exports.GoogleBooksService = GoogleBooksService;
//# sourceMappingURL=googlebooks.service.js.map