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
var ListsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exceptionWrappers_1 = require("../common/exceptionWrappers");
const responseWrappers_1 = require("../common/types/responseWrappers");
const list_schema_1 = require("./definitions/list.schema");
const list_dto_1 = require("./definitions/list.dto");
const dtoHelpers_1 = require("../common/dtoHelpers");
const userLists_service_1 = require("../userLists/userLists.service");
const allListItems_service_1 = require("../listItems/allListItems.service");
const stringIdType_1 = require("../common/types/stringIdType");
const mongooseTableHelpers_1 = require("../common/mongooseTableHelpers");
const listType_1 = require("../common/types/listType");
let ListsService = ListsService_1 = class ListsService {
    constructor(listModel, connection, allListItemsService, userListsService) {
        this.listModel = listModel;
        this.connection = connection;
        this.allListItemsService = allListItemsService;
        this.userListsService = userListsService;
    }
    async findAll(userId) {
        try {
            const result = await this.listModel
                .find(Object.assign({}, ListsService_1.hasListSchemaReadAccess(userId)))
                .exec();
            return new responseWrappers_1.DataTotalResponse(result.map(doc => list_dto_1.ListDto.assign(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findByQuery(queryListDto, userId) {
        const dto = dtoHelpers_1.cleanDtoFields(queryListDto, key => key !== 'ownerOnly');
        if (queryListDto.ownerOnly && typeof queryListDto.ownerOnly === 'string') {
            queryListDto.ownerOnly = queryListDto.ownerOnly === 'true';
        }
        try {
            let accessFilter;
            if (queryListDto.ownerOnly === true) {
                accessFilter = ListsService_1.isListSchemaOwner(userId);
            }
            else if (queryListDto.ownerOnly === false) {
                accessFilter = ListsService_1.isPublicButNotOwner(userId);
            }
            else {
                accessFilter = ListsService_1.hasListSchemaReadAccess(userId);
            }
            const result = await this.listModel
                .find({
                $and: [Object.assign({}, accessFilter), Object.assign({}, ListsService_1.getQueryFilter(dto))],
            })
                .exec();
            return new responseWrappers_1.DataTotalResponse(result.map(doc => list_dto_1.ListDto.assign(doc)));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findById(listId, userId) {
        try {
            exceptionWrappers_1.validateObjectId(listId);
            const result = await this.listModel
                .findOne({
                $and: [
                    Object.assign({ _id: listId }, ListsService_1.hasListSchemaReadAccess(userId)),
                ],
            })
                .populate({
                path: mongooseTableHelpers_1.getMultiListItemPropName(listType_1.ListType.Book),
                model: mongooseTableHelpers_1.getListItemModelName(listType_1.ListType.Book),
            })
                .exec();
            if (!result)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return list_dto_1.ListDto.assign(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async create(createListDto, userId) {
        const createdList = new this.listModel(Object.assign(Object.assign({}, createListDto), { ownerId: userId }));
        try {
            const result = await createdList.save();
            return list_dto_1.ListDto.assign(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async patch(listId, patchListDto, userId) {
        try {
            exceptionWrappers_1.validateObjectId(listId);
            const dto = dtoHelpers_1.cleanDtoFields(patchListDto);
            const requestedDoc = await this.listModel
                .findOne({
                $and: [
                    Object.assign({ _id: listId }, ListsService_1.hasListSchemaWriteAccess(userId)),
                ],
            })
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
    async delete(listId, userId) {
        try {
            exceptionWrappers_1.validateObjectId(listId);
            const list = await this.getListWithWriteAccess(userId, listId);
            if (!list)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const session = await this.connection.startSession();
            await this.connection.transaction(async () => {
                await this.allListItemsService.deleteAllItemsByList(userId, listId, list.type, session);
                await this.userListsService.deleteAllUserListsByList(listId, session);
                const result = await this.listModel.findOneAndDelete({
                    $and: [
                        Object.assign({ _id: listId }, ListsService_1.hasListSchemaReadAccess(userId)),
                    ],
                }, { session });
                if (!result)
                    throw new mongoose_2.Error.DocumentNotFoundError(null);
            });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async getListWithReadAccess(userId, listId) {
        const result = await this.listModel
            .findOne({
            $and: [
                Object.assign({ _id: new mongoose_2.Types.ObjectId(listId) }, ListsService_1.hasListSchemaReadAccess(userId)),
            ],
        })
            .exec();
        if (!result)
            throw new mongoose_2.Error.DocumentNotFoundError(null);
        return result;
    }
    async getListWithWriteAccess(userId, listId) {
        const result = this.listModel
            .findOne({
            $and: [
                Object.assign({ _id: new mongoose_2.Types.ObjectId(listId) }, ListsService_1.hasListSchemaWriteAccess(userId)),
            ],
        })
            .exec();
        if (!result)
            throw new mongoose_2.Error.DocumentNotFoundError(null);
        return result;
    }
    async updateListItemsInList(listId, userId, operation, field, value, session) {
        try {
            await this.listModel.updateOne({
                $and: [
                    Object.assign({ _id: listId }, ListsService_1.hasListSchemaWriteAccess(userId)),
                ],
            }, { [operation]: { [field]: value } }, { session });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findMostRecentCreated(ownerId, count, isOwnProfile) {
        try {
            const query = isOwnProfile
                ? { ownerId }
                : { $and: [{ ownerId, isPublic: true }] };
            const result = await this.listModel
                .find(Object.assign({}, query))
                .sort({ createdAt: 'desc' })
                .limit(count)
                .exec();
            return result.map(doc => list_dto_1.ListDto.assign(doc));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async findMostRecentUpdated(ownerId, count, isOwnProfile) {
        try {
            const query = isOwnProfile
                ? { ownerId }
                : { $and: [{ ownerId, isPublic: true }] };
            const result = await this.listModel
                .find(Object.assign({}, query))
                .sort({ updatedAt: 'desc' })
                .limit(count)
                .exec();
            return result.map(doc => list_dto_1.ListDto.assign(doc));
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async getPublicListsByUser(userId) {
        return await this.listModel
            .find({ $and: [{ ownerId: userId }, { isPublic: true }] })
            .exec();
    }
    async getAllListsByUser(userId) {
        return await this.listModel.find({ ownerId: userId }).exec();
    }
    static getQueryFilter(queryListDto) {
        const result = {};
        let keys = Object.keys(queryListDto);
        if (keys.length) {
            if (keys.includes('type')) {
                result['$and'] = [];
                result['$and'].push({
                    ['type']: queryListDto['type'],
                });
                keys = keys.filter(key => key !== 'type');
            }
            if (keys.length) {
                result['$or'] = [];
                keys.forEach(key => {
                    result['$or'].push({
                        [key]: { $regex: queryListDto[key], $options: 'i' },
                    });
                });
            }
        }
        return result;
    }
    static hasListSchemaReadAccess(userId) {
        return { $or: [{ ownerId: userId }, { isPublic: true }] };
    }
    static hasListSchemaWriteAccess(userId) {
        return { ownerId: userId };
    }
    static isListSchemaOwner(userId) {
        return { ownerId: userId };
    }
    static isPublicButNotOwner(userId) {
        return { $and: [{ ownerId: { $ne: userId } }, { isPublic: true }] };
    }
};
ListsService = ListsService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(list_schema_1.List.name)),
    __param(1, mongoose_1.InjectConnection()),
    __param(2, common_1.Inject(common_1.forwardRef(() => allListItems_service_1.AllListItemsService))),
    __param(3, common_1.Inject(common_1.forwardRef(() => userLists_service_1.UserListsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection,
        allListItems_service_1.AllListItemsService,
        userLists_service_1.UserListsService])
], ListsService);
exports.ListsService = ListsService;
//# sourceMappingURL=lists.service.js.map