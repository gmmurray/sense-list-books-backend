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
var ListItemsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const exceptionWrappers_1 = require("../common/exceptionWrappers");
const listType_1 = require("../common/types/listType");
const mongooseTableHelpers_1 = require("../common/mongooseTableHelpers");
const responseWrappers_1 = require("../common/types/responseWrappers");
const list_schema_1 = require("../lists/definitions/list.schema");
const lists_service_1 = require("../lists/lists.service");
const allUserListItems_service_1 = require("../userListItems/allUserListItems.service");
const stringIdType_1 = require("../common/types/stringIdType");
let ListItemsService = ListItemsService_1 = class ListItemsService {
    constructor(model, dbConnection, listsService, allUserListItemsService) {
        this.model = model;
        this.dbConnection = dbConnection;
        this.listsService = listsService;
        this.allUserListItemsService = allUserListItemsService;
        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
    }
    async updateListItemOrdinals(userId, updates) {
        try {
            if (!updates.listId || !updates.ordinalUpdates)
                throw new mongoose_1.Error.DocumentNotFoundError(null);
            exceptionWrappers_1.validateObjectId(updates.listId);
            for (const listItemId of updates.ordinalUpdates.map(update => update.listItemId)) {
                exceptionWrappers_1.validateObjectId(listItemId);
            }
            const list = await this.hasListItemWriteAccess(userId, updates.listId);
            if (!list)
                throw new mongoose_1.Error.DocumentNotFoundError(null);
            if (!ListItemsService_1.validListItemOrdinals(list.bookListItems.length, updates.ordinalUpdates.map(update => update.ordinal)))
                throw new mongoose_1.Error.ValidationError(null);
            await this.dbConnection.startSession();
            await this.dbConnection.transaction(async () => {
                const bulkUpdates = [];
                for (const update of updates.ordinalUpdates) {
                    const operation = {
                        updateOne: {
                            filter: { _id: new mongoose_1.Types.ObjectId(update.listItemId) },
                            update: { ordinal: update.ordinal },
                        },
                    };
                    bulkUpdates.push(operation);
                }
                await this.model.bulkWrite(bulkUpdates);
            });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async delete(userId, listItemId, listType) {
        try {
            exceptionWrappers_1.validateObjectId(listItemId);
            const item = await this.model
                .findById({ _id: new mongoose_1.Types.ObjectId(listItemId) })
                .populate(mongooseTableHelpers_1.getSingleListPropName())
                .exec();
            if (!item)
                throw new mongoose_1.Error.DocumentNotFoundError(null);
            await this.hasListItemWriteAccess(userId, item.list._id);
            const session = await this.dbConnection.startSession();
            await this.dbConnection.transaction(async () => {
                await this.listsService.updateListItemsInList(new mongoose_1.Types.ObjectId(item.list._id), userId, '$pull', mongooseTableHelpers_1.getMultiListItemPropName(listType), item._id, session);
                await this.allUserListItemsService.deleteAllUserItemsBySingleListItem(userId, item._id, listType, session);
                const result = await this.model.findByIdAndDelete({
                    _id: item._id,
                }, { session });
                if (!result)
                    throw new mongoose_1.Error.DocumentNotFoundError(null);
            });
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async deleteAllItemsByList(userId, listId, session, listType, itemIds) {
        await this.allUserListItemsService.deleteAllUserItemsByListItems(userId, itemIds, listType, session);
        await this.model.deleteMany({ list: new mongoose_1.Types.ObjectId(listId) }, { session });
    }
    async hasListItemWriteAccess(userId, listId) {
        return await this.listsService.getListWithWriteAccess(userId, listId);
    }
    async hasListItemReadAccess(userId, listId) {
        return await this.listsService.getListWithReadAccess(userId, listId);
    }
    static validListItemOrdinals(listLength, givenOrdinals) {
        const expectedOrdinals = Array.from(Array(listLength).keys());
        return expectedOrdinals.every(ordinal => givenOrdinals.includes(ordinal));
    }
};
ListItemsService = ListItemsService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Connection,
        lists_service_1.ListsService,
        allUserListItems_service_1.AllUserListItemsService])
], ListItemsService);
exports.ListItemsService = ListItemsService;
//# sourceMappingURL=listItems.service.js.map