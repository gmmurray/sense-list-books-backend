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
var UserListItemsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const exceptionWrappers_1 = require("../common/exceptionWrappers");
const listType_1 = require("../common/types/listType");
const mongooseTableHelpers_1 = require("../common/mongooseTableHelpers");
const responseWrappers_1 = require("../common/types/responseWrappers");
const userLists_service_1 = require("../userLists/userLists.service");
const stringIdType_1 = require("../common/types/stringIdType");
let UserListItemsService = UserListItemsService_1 = class UserListItemsService {
    constructor(model, dbConnection, userListsService) {
        this.model = model;
        this.dbConnection = dbConnection;
        this.userListsService = userListsService;
        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
    }
    async delete(userId, userListItemId, listType) {
        try {
            exceptionWrappers_1.validateObjectId(userListItemId);
            const item = await this.model
                .findById({ _id: new mongoose_1.Types.ObjectId(userListItemId) })
                .exec();
            if (!item ||
                !UserListItemsService_1.hasUserListItemWriteAccess(userId, item))
                throw new mongoose_1.Error.DocumentNotFoundError(null);
            const userListId = item.userList instanceof mongoose_1.Types.ObjectId ||
                typeof item.userList === 'string'
                ? item.userList
                : undefined;
            if (!userListId)
                throw new common_1.InternalServerErrorException('User List type check error');
            const session = await this.dbConnection.startSession();
            await this.dbConnection.transaction(async () => {
                await this.userListsService.updateItemsInUserList(userId, userListId, '$pull', mongooseTableHelpers_1.getMultiUserListItemPropName(listType), new mongoose_1.Types.ObjectId(userListItemId), session);
                const result = await this.model.findByIdAndDelete({
                    _id: item._id,
                }, { session });
                if (!result)
                    throw new mongoose_1.Error.DocumentNotFoundError(null);
            });
        }
        catch (error) { }
    }
    async deleteAllUserItemsByUserList(userListId, session) {
        await this.model.deleteMany({
            userlist: new mongoose_1.Types.ObjectId(userListId),
        }, { session });
    }
    async deleteAllUserItemsByIds(userId, userItemIds, itemField, session) {
        await this.model.deleteMany({ _id: { $in: userItemIds } }, { session });
        await this.userListsService.updateItemsInAllUserLists(userId, '$pull', itemField, { $in: userItemIds }, session);
    }
    static hasUserListItemWriteAccess(userId, userListItem) {
        return userListItem.userId === userId;
    }
};
UserListItemsService = UserListItemsService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Connection,
        userLists_service_1.UserListsService])
], UserListItemsService);
exports.UserListItemsService = UserListItemsService;
//# sourceMappingURL=userListItem.service.js.map