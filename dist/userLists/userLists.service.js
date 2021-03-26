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
var UserListsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dtoHelpers_1 = require("../common/dtoHelpers");
const exceptionWrappers_1 = require("../common/exceptionWrappers");
const listType_1 = require("../common/types/listType");
const mongooseTableHelpers_1 = require("../common/mongooseTableHelpers");
const responseWrappers_1 = require("../common/types/responseWrappers");
const list_schema_1 = require("../lists/definitions/list.schema");
const lists_service_1 = require("../lists/lists.service");
const allUserListItems_service_1 = require("../userListItems/allUserListItems.service");
const buli_service_1 = require("../userListItems/books/buli.service");
const userListItem_schema_1 = require("../userListItems/definitions/userListItem.schema");
const userList_dto_1 = require("./definitions/userList.dto");
const userList_schema_1 = require("./definitions/userList.schema");
const stringIdType_1 = require("../common/types/stringIdType");
let UserListsService = UserListsService_1 = class UserListsService {
    constructor(model, connection, listsService, bookUserListItemsService, allUserListItemsService) {
        this.model = model;
        this.connection = connection;
        this.listsService = listsService;
        this.bookUserListItemsService = bookUserListItemsService;
        this.allUserListItemsService = allUserListItemsService;
    }
    async findAll(userId) {
        try {
            const result = await this.model
                .find({ userId })
                .populate(mongooseTableHelpers_1.getSingleListPropName())
                .populate({
                path: mongooseTableHelpers_1.getMultiUserListItemPropName(listType_1.ListType.Book),
                model: mongooseTableHelpers_1.getUserListItemModelName(listType_1.ListType.Book),
                match: { userId },
            })
                .exec();
            return new responseWrappers_1.DataTotalResponse(result.map(doc => userList_dto_1.UserListDto.assign(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
        return;
    }
    async getPopulatedUserList(userId, userListId) {
        try {
            exceptionWrappers_1.validateObjectId(userListId);
            const shallowUserList = await this.model.findById(userListId);
            if (!shallowUserList)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const listId = shallowUserList.list instanceof mongoose_2.Types.ObjectId ||
                typeof shallowUserList.list === 'string'
                ? shallowUserList.list
                : undefined;
            if (!listId)
                throw new common_1.InternalServerErrorException('List type check error');
            const authorizedList = await this.hasListReadAccess(userId, listId);
            const fullUserList = await shallowUserList
                .populate({
                path: mongooseTableHelpers_1.getSingleListPropName(),
                populate: {
                    path: mongooseTableHelpers_1.getMultiListItemPropName(authorizedList.type),
                    model: mongooseTableHelpers_1.getListItemModelName(authorizedList.type),
                },
            })
                .populate({
                path: mongooseTableHelpers_1.getMultiUserListItemPropName(authorizedList.type),
                model: mongooseTableHelpers_1.getUserListItemModelName(authorizedList.type),
                match: { userId },
            })
                .execPopulate();
            return userList_dto_1.UserListDto.assignWithPopulatedDocuments(fullUserList);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async create(userId, createDto) {
        try {
            exceptionWrappers_1.validateObjectId(createDto.list);
            const list = await this.hasListReadAccess(userId, createDto.list);
            if (!list)
                throw new mongoose_2.Error.ValidationError(null);
            const existingUserList = await this.model.findOne({
                $and: [{ list: new mongoose_2.Types.ObjectId(createDto.list) }, { userId }],
            });
            if (existingUserList) {
                return userList_dto_1.UserListDto.assign(existingUserList);
            }
            let listItems;
            switch (list.type) {
                case listType_1.ListType.Book:
                    listItems = list.bookListItems;
                    break;
                default:
                    throw new common_1.NotImplementedException();
            }
            createDto.userId = userId;
            const session = await this.connection.startSession();
            let result;
            let createdUserItems;
            await this.connection.transaction(async () => {
                const created = new this.model(Object.assign(Object.assign({}, createDto), { list: new mongoose_2.Types.ObjectId(createDto.list) }));
                result = await created.save({ session });
                createdUserItems = await this.bookUserListItemsService.createDefaultItemsForList(userId, result._id, listItems, session);
                await this.updateItemsInUserList(userId, result._id, '$push', mongooseTableHelpers_1.getMultiUserListItemPropName(list.type), {
                    $each: [
                        ...createdUserItems.map(item => new mongoose_2.Types.ObjectId(item._id)),
                    ],
                }, session);
            });
            if (!result)
                throw new common_1.InternalServerErrorException();
            return userList_dto_1.UserListDto.assign(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async patch(userId, userListId, patchDto) {
        const dto = dtoHelpers_1.cleanDtoFields(patchDto);
        try {
            exceptionWrappers_1.validateObjectId(userListId);
            const requestedDoc = await this.model.findById(userListId).exec();
            if (!requestedDoc ||
                !UserListsService_1.hasUserListWriteAccess(userId, requestedDoc))
                throw new mongoose_2.Error.DocumentNotFoundError(null);
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
    async delete(userId, userListId) {
        try {
            exceptionWrappers_1.validateObjectId(userListId);
            const userList = await this.model
                .findById(userListId)
                .populate(mongooseTableHelpers_1.getSingleListPropName())
                .exec();
            if (!userList ||
                !UserListsService_1.hasUserListWriteAccess(userId, userList))
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const session = await this.connection.startSession();
            await this.connection.transaction(async () => {
                const list = userList.list;
                await this.allUserListItemsService.deleteAllUserItemsByUserList(userListId, list.type, session);
                const result = await this.model.findByIdAndDelete(new mongoose_2.Types.ObjectId(userListId), { session });
                if (!result)
                    throw new mongoose_2.Error.DocumentNotFoundError(null);
            });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findMostRecentCreated(userId, count, type) {
        try {
            const result = await this.model
                .find({ userId })
                .sort({ createdAt: 'desc' })
                .limit(count)
                .populate({
                path: mongooseTableHelpers_1.getSingleListPropName(),
                populate: {
                    path: mongooseTableHelpers_1.getMultiListItemPropName(type),
                    model: mongooseTableHelpers_1.getListItemModelName(type),
                },
            })
                .exec();
            return result.map(doc => userList_dto_1.UserListDto.assignWithPopulatedListOnly(doc));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findMostRecentActive(userId, count, type) {
        try {
            const result = await this.model
                .find({ userId })
                .sort({ updatedAt: 'desc' })
                .limit(count)
                .populate(mongooseTableHelpers_1.getSingleListPropName())
                .populate({
                path: mongooseTableHelpers_1.getMultiUserListItemPropName(type),
                model: mongooseTableHelpers_1.getUserListItemModelName(type),
                match: { userId },
            })
                .exec();
            return result.map(doc => userList_dto_1.UserListDto.assign(doc));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async updateItemsInUserList(userId, userListId, operation, field, value, session) {
        try {
            await this.model.updateOne({ $and: [{ _id: new mongoose_2.Types.ObjectId(userListId) }, { userId }] }, {
                [operation]: { [field]: value },
            }, { session });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async updateItemsInAllUserLists(userId, operation, field, value, session) {
        try {
            await this.model.updateOne({ userId }, {
                [operation]: { [field]: value },
            }, { session });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async deleteAllUserListsByList(listId, session) {
        await this.model.deleteMany({ list: new mongoose_2.Types.ObjectId(listId) }, { session });
    }
    async findUserListById(userListId) {
        return await this.model.findById(new mongoose_2.Types.ObjectId(userListId));
    }
    async hasListReadAccess(userId, listId) {
        return await this.listsService.getListWithReadAccess(userId, listId);
    }
    static hasUserListWriteAccess(userId, userList) {
        return userList.userId === userId;
    }
};
UserListsService = UserListsService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(userList_schema_1.UserList.name)),
    __param(1, mongoose_1.InjectConnection()),
    __param(2, common_1.Inject(common_1.forwardRef(() => lists_service_1.ListsService))),
    __param(3, common_1.Inject(common_1.forwardRef(() => buli_service_1.BULIService))),
    __param(4, common_1.Inject(common_1.forwardRef(() => allUserListItems_service_1.AllUserListItemsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection,
        lists_service_1.ListsService,
        buli_service_1.BULIService,
        allUserListItems_service_1.AllUserListItemsService])
], UserListsService);
exports.UserListsService = UserListsService;
//# sourceMappingURL=userLists.service.js.map