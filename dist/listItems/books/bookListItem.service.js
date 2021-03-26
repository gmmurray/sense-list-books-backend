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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookListItemsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bookListItem_schema_1 = require("./definitions/bookListItem.schema");
const listItems_service_1 = require("../listItems.service");
const bookListItem_dto_1 = require("./definitions/bookListItem.dto");
const bookListItem_1 = require("./definitions/bookListItem");
const lists_service_1 = require("../../lists/lists.service");
const responseWrappers_1 = require("../../common/types/responseWrappers");
const exceptionWrappers_1 = require("../../common/exceptionWrappers");
const openLibrary_service_1 = require("../../openLibrary/openLibrary.service");
const dtoHelpers_1 = require("../../common/dtoHelpers");
const listType_1 = require("../../common/types/listType");
const mongooseTableHelpers_1 = require("../../common/mongooseTableHelpers");
const common_1 = require("@nestjs/common");
const allUserListItems_service_1 = require("../../userListItems/allUserListItems.service");
const stringIdType_1 = require("../../common/types/stringIdType");
const googlebooks_service_1 = require("../../googleBooks/googlebooks.service");
const GoogleApiBook_1 = require("../../googleBooks/GoogleApiBook");
let BookListItemsService = class BookListItemsService extends listItems_service_1.ListItemsService {
    constructor(bookListItemsModel, connection, listService, googleBooksService, openLibraryService, allUserListItemService) {
        super(bookListItemsModel, connection, listService, allUserListItemService);
        this.bookListItemsModel = bookListItemsModel;
        this.connection = connection;
        this.listService = listService;
        this.googleBooksService = googleBooksService;
        this.openLibraryService = openLibraryService;
        this.allUserListItemService = allUserListItemService;
    }
    async findAll(userId, listId) {
        try {
            exceptionWrappers_1.validateObjectId(listId);
            const list = await this.hasListItemReadAccess(userId, listId);
            if (!list)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const items = await this.bookListItemsModel
                .find({ list: new mongoose_2.Types.ObjectId(listId) })
                .exec();
            return new responseWrappers_1.DataTotalResponse(items.map(doc => bookListItem_dto_1.BookListItemDto.assign(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findByQuery(userId, listId, queryDto) {
        const dto = dtoHelpers_1.cleanDtoFields(queryDto);
        try {
            exceptionWrappers_1.validateObjectId(listId);
            const list = await this.hasListItemReadAccess(userId, listId);
            if (!list)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const result = await this.bookListItemsModel
                .find({
                $and: [
                    { list: new mongoose_2.Types.ObjectId(listId) },
                    Object.assign({}, BookListItemsService.getQueryFilter(dto)),
                ],
            })
                .exec();
            return new responseWrappers_1.DataTotalResponse(result.map(doc => bookListItem_dto_1.BookListItemDto.assign(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
        return null;
    }
    async findById(userId, listItemId) {
        try {
            exceptionWrappers_1.validateObjectId(listItemId);
            const result = await this.bookListItemsModel.findById(listItemId).exec();
            if (!result)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const list = await this.hasListItemReadAccess(userId, result.list);
            if (!list)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return bookListItem_dto_1.BookListItemDto.assign(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async create(createDto, userId) {
        try {
            exceptionWrappers_1.validateObjectId(createDto.list);
            const list = await this.hasListItemWriteAccess(userId, createDto.list);
            if (!list)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const googleVolume = await this.googleBooksService.getBookByVolumeId(createDto.volumeId);
            if (!googleVolume)
                throw new mongoose_2.Error.ValidationError(null);
            const isbn = GoogleApiBook_1.GoogleApiBook.getIsbn(googleVolume.volumeInfo.industryIdentifiers);
            const openLibraryBook = await this.openLibraryService.getBookByIsbn(isbn);
            const normalizedBook = bookListItem_1.BookListItemDomain.create(new mongoose_2.Types.ObjectId(createDto.list), createDto.ordinal, googleVolume, openLibraryBook);
            const session = await this.connection.startSession();
            let result;
            await this.connection.transaction(async () => {
                const created = new this.bookListItemsModel(Object.assign({}, normalizedBook));
                result = await created.save({ session });
                await this.listService.updateListItemsInList(new mongoose_2.Types.ObjectId(createDto.list), userId, '$push', mongooseTableHelpers_1.getMultiListItemPropName(listType_1.ListType.Book), result._id, session);
            });
            if (!result)
                throw new common_1.InternalServerErrorException();
            return bookListItem_dto_1.BookListItemDto.assign(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async patch(userId, listItemId, patchDto) {
        const dto = dtoHelpers_1.cleanDtoFields(patchDto);
        try {
            const requestedDoc = await this.bookListItemsModel
                .findById(listItemId)
                .exec();
            if (!requestedDoc)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            await this.hasListItemWriteAccess(userId, requestedDoc.list);
            for (const key in dto) {
                requestedDoc[key] = dto[key];
            }
            await requestedDoc.save();
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
        return;
    }
    async updateOrdinals(userId, updates) {
        return await super.updateListItemOrdinals(userId, updates);
    }
    async delete(userId, listItemId) {
        return await super.delete(userId, listItemId, listType_1.ListType.Book);
    }
    async deleteAllItemsByList(userId, listId, session, listType) {
        const items = await this.bookListItemsModel
            .find({ list: new mongoose_2.Types.ObjectId(listId) }, null, { session })
            .exec();
        const itemIds = items.map(item => item._id);
        super.deleteAllItemsByList(userId, listId, session, listType, itemIds);
    }
    static getQueryFilter(queryDto) {
        const result = {};
        let keys = Object.keys(queryDto);
        if (keys.length) {
            if (keys.includes('listType')) {
                result['$and'] = [];
                result['$and'].push({
                    ['listType']: queryDto['listType'],
                });
                keys = keys.filter(key => key !== 'listType');
            }
            if (keys.length) {
                result['$or'] = [];
                keys.forEach(key => {
                    switch (key) {
                        case 'ordinal': {
                            result['$or'].push({
                                [key]: queryDto[key],
                            });
                            break;
                        }
                        case 'author': {
                            result['$or'].push({
                                ['meta.authors']: { $regex: queryDto[key], $options: 'i' },
                            });
                            break;
                        }
                        default: {
                            result['$or'].push({
                                [`meta.${key}`]: { $regex: queryDto[key], $options: 'i' },
                            });
                        }
                    }
                });
            }
        }
        return result;
    }
};
BookListItemsService = __decorate([
    __param(0, mongoose_1.InjectModel(bookListItem_schema_1.BookListItem.name)),
    __param(1, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection,
        lists_service_1.ListsService,
        googlebooks_service_1.GoogleBooksService,
        openLibrary_service_1.OpenLibraryService,
        allUserListItems_service_1.AllUserListItemsService])
], BookListItemsService);
exports.BookListItemsService = BookListItemsService;
//# sourceMappingURL=bookListItem.service.js.map