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
exports.BULIService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dtoHelpers_1 = require("../../common/dtoHelpers");
const exceptionWrappers_1 = require("../../common/exceptionWrappers");
const listType_1 = require("../../common/types/listType");
const mongooseTableHelpers_1 = require("../../common/mongooseTableHelpers");
const responseWrappers_1 = require("../../common/types/responseWrappers");
const userLists_service_1 = require("../../userLists/userLists.service");
const userListItem_service_1 = require("../userListItem.service");
const bookUserListItem_schema_1 = require("./definitions/bookUserListItem.schema");
const buli_dto_1 = require("./definitions/buli.dto");
const defaultBULI_1 = require("./definitions/defaultBULI");
const stringIdType_1 = require("../../common/types/stringIdType");
const userStatistics_1 = require("../../users/definitions/statistics/userStatistics");
const userListItemStatus_1 = require("../../common/types/userListItemStatus");
const bookFormatType_1 = require("../../common/types/bookFormatType");
const bookListItem_dto_1 = require("../../listItems/books/definitions/bookListItem.dto");
const userList_dto_1 = require("../../userLists/definitions/userList.dto");
let BULIService = class BULIService extends userListItem_service_1.UserListItemsService {
    constructor(bookModel, connection, userListService) {
        super(bookModel, connection, userListService);
        this.bookModel = bookModel;
        this.connection = connection;
        this.userListService = userListService;
    }
    async findAll(userId) {
        try {
            const items = await this.bookModel.find({ userId }).exec();
            if (!items)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return new responseWrappers_1.DataTotalResponse(items.map(doc => buli_dto_1.BULIDto.assign(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findAllPopulated(userId) {
        try {
            const items = await this.bookModel
                .find({ userId })
                .populate({
                path: mongooseTableHelpers_1.getSingleListItemPropName(listType_1.ListType.Book),
                model: mongooseTableHelpers_1.getListItemModelName(listType_1.ListType.Book),
            })
                .populate({
                path: mongooseTableHelpers_1.getSingleUserListPropName(),
            })
                .exec();
            if (!items)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return new responseWrappers_1.DataTotalResponse(items.map(doc => buli_dto_1.BULIDto.assign(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findAllByUserList(userId, userListId) {
        try {
            exceptionWrappers_1.validateObjectId(userListId);
            const userList = await this.userListService.findUserListById(userListId);
            if (!userList || userList.userId !== userId)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const items = await this.bookModel
                .find({
                $and: [{ userList: new mongoose_2.Types.ObjectId(userListId) }, { userId }],
            })
                .populate({
                path: mongooseTableHelpers_1.getSingleListItemPropName(listType_1.ListType.Book),
                model: mongooseTableHelpers_1.getListItemModelName(listType_1.ListType.Book),
            })
                .populate({
                path: mongooseTableHelpers_1.getSingleUserListPropName(),
            })
                .exec();
            if (!items)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return new responseWrappers_1.DataTotalResponse(items.map(doc => buli_dto_1.BULIDto.assignWithPopulatedDocuments(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findById(userId, userListItemId) {
        try {
            exceptionWrappers_1.validateObjectId(userListItemId);
            const result = await this.bookModel
                .findOne({
                $and: [{ _id: new mongoose_2.Types.ObjectId(userListItemId) }, { userId }],
            })
                .populate({
                path: mongooseTableHelpers_1.getSingleListItemPropName(listType_1.ListType.Book),
                model: mongooseTableHelpers_1.getListItemModelName(listType_1.ListType.Book),
            })
                .populate({
                path: mongooseTableHelpers_1.getSingleUserListPropName(),
            })
                .exec();
            if (!result)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return buli_dto_1.BULIDto.assignWithPopulatedDocuments(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async create(userId, createDto) {
        try {
            exceptionWrappers_1.validateObjectId(createDto.bookListItem);
            exceptionWrappers_1.validateObjectId(createDto.userList);
            const userList = await this.userListService.findUserListById(createDto.userList);
            if (!userList || userList.userId !== userId)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const session = await this.connection.startSession();
            let result;
            await this.connection.transaction(async () => {
                const created = new this.bookModel(Object.assign(Object.assign({}, createDto), { userId, userList: new mongoose_2.Types.ObjectId(createDto.userList), bookListItem: new mongoose_2.Types.ObjectId(createDto.bookListItem) }));
                result = await created.save({ session });
                await this.userListService.updateItemsInUserList(userId, new mongoose_2.Types.ObjectId(createDto.userList), '$push', mongooseTableHelpers_1.getMultiUserListItemPropName(listType_1.ListType.Book), result._id, session);
            });
            if (!result)
                throw new common_1.InternalServerErrorException();
            const test = buli_dto_1.BULIDto.assign(result);
            return test;
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async patch(userId, buliId, patchDto) {
        try {
            exceptionWrappers_1.validateObjectId(buliId);
            const dto = dtoHelpers_1.cleanDtoFields(patchDto);
            const requestedDoc = await this.bookModel
                .findOne({ $and: [{ userId }, { _id: buliId }] })
                .exec();
            if (!requestedDoc)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            for (const key in dto) {
                requestedDoc[key] = dto[key];
            }
            await requestedDoc.save();
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async delete(userId, userListItemId) {
        return await super.delete(userId, userListItemId, listType_1.ListType.Book);
    }
    async findMostRecentUpdated(userId, count) {
        try {
            const items = await this.bookModel
                .find({ userId })
                .sort({ updatedAt: 'desc' })
                .limit(count)
                .populate({
                path: mongooseTableHelpers_1.getSingleListItemPropName(listType_1.ListType.Book),
                model: mongooseTableHelpers_1.getListItemModelName(listType_1.ListType.Book),
            })
                .exec();
            if (!items)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return items
                .filter(doc => !!doc.bookListItem)
                .map(doc => buli_dto_1.BULIDto.assignWithPopulatedListItemsOnly(doc));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async createDefaultItemsForList(userId, userListId, bookListItems, session) {
        try {
            const newItems = bookListItems.map(listItemId => new this.bookModel(Object.assign({}, defaultBULI_1.DefaultBULI.createDefault(userId, userListId, listItemId))));
            return await this.bookModel.insertMany(newItems, { session });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findAllBySingleListItem(userId, listItemId) {
        return await this.bookModel
            .find({
            $and: [{ userId }, { bookListItem: new mongoose_2.Types.ObjectId(listItemId) }],
        })
            .exec();
    }
    async findAllBySingleListItemWithoutUser(listItemId) {
        return await this.bookModel
            .find({
            bookListItem: new mongoose_2.Types.ObjectId(listItemId),
        })
            .exec();
    }
    async findAllByListItems(userId, listItemIds) {
        return await this.bookModel
            .find({
            $and: [{ userId }, { bookListItem: { $in: listItemIds } }],
        })
            .exec();
    }
    async findAllByListItemsWithoutUser(listItemIds) {
        return await this.bookModel
            .find({ bookListItem: { $in: listItemIds } })
            .exec();
    }
    async getAggregateItemStatistics(userId) {
        const res = await this.findAllPopulated(userId);
        const userListItems = res.data;
        let pagesReadCount = 0;
        const relatedUserLists = [];
        const completedUserLists2 = {};
        let booksReadCount = 0;
        const booksOwned = {};
        userListItems.forEach(item => {
            var _a;
            if (item.status === userListItemStatus_1.BookReadingStatus.completed) {
                booksReadCount++;
                pagesReadCount += item.bookListItem.meta.pageCount;
                const completedItemsForList = completedUserLists2[item.userList.id.toString()] ||
                    0;
                completedUserLists2[item.userList.id.toString()] =
                    completedItemsForList + 1;
                if (!relatedUserLists.some(ul => ul.id.equals(item.userList.id))) {
                    relatedUserLists.push(item.userList);
                }
            }
            if (item.owned) {
                const booksOwnedForType = (_a = booksOwned[item.format || bookFormatType_1.BookFormatType.Physical]) !== null && _a !== void 0 ? _a : 0;
                booksOwned[item.format || bookFormatType_1.BookFormatType.Physical] =
                    booksOwnedForType + 1;
            }
        });
        const completedUserLists = relatedUserLists.filter(ul => ul.userListItems.length === completedUserLists2[ul.id.toString()]).length;
        return {
            pagesReadCount,
            listsCompletedCount: completedUserLists,
            booksReadCount,
            booksOwned,
        };
    }
};
BULIService = __decorate([
    __param(0, mongoose_1.InjectModel(bookUserListItem_schema_1.BookUserListItem.name)),
    __param(1, mongoose_1.InjectConnection()),
    __param(2, common_1.Inject(common_1.forwardRef(() => userLists_service_1.UserListsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection,
        userLists_service_1.UserListsService])
], BULIService);
exports.BULIService = BULIService;
//# sourceMappingURL=buli.service.js.map