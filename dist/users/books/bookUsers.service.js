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
exports.BookUsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dtoHelpers_1 = require("../../common/dtoHelpers");
const exceptionWrappers_1 = require("../../common/exceptionWrappers");
const mongooseTableHelpers_1 = require("../../common/mongooseTableHelpers");
const listType_1 = require("../../common/types/listType");
const responseWrappers_1 = require("../../common/types/responseWrappers");
const stringIdType_1 = require("../../common/types/stringIdType");
const bookListItem_dto_1 = require("../../listItems/books/definitions/bookListItem.dto");
const list_dto_1 = require("../../lists/definitions/list.dto");
const buli_service_1 = require("../../userListItems/books/buli.service");
const buli_dto_1 = require("../../userListItems/books/definitions/buli.dto");
const userList_dto_1 = require("../../userLists/definitions/userList.dto");
const userLists_service_1 = require("../../userLists/userLists.service");
const activityType_1 = require("../definitions/activityType");
const recentActivity_1 = require("../definitions/recentActivity");
const privateUserFields_dto_1 = require("../definitions/userProfiles/privateUserFields.dto");
const userProfile_dto_1 = require("../definitions/userProfiles/userProfile.dto");
const userProfile_schema_1 = require("../definitions/userProfiles/userProfile.schema");
let BookUsersService = class BookUsersService {
    constructor(userListsService, buliService, userProfileModel) {
        this.userListsService = userListsService;
        this.buliService = buliService;
        this.userProfileModel = userProfileModel;
    }
    async findUserProfile(authId, userId) {
        try {
            const result = await this.userProfileModel
                .findOne({ authId })
                .populate(mongooseTableHelpers_1.getUserProfileListCountPropName());
            if (!result)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return userProfile_dto_1.UserProfileDto.assign(result).hidePrivateFields(userId);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async createUserProfile(createDto, userId) {
        var _a;
        const createdUserProfile = new this.userProfileModel(Object.assign(Object.assign({}, createDto), { authId: userId, privateFields: (_a = createDto === null || createDto === void 0 ? void 0 : createDto.privateFields) !== null && _a !== void 0 ? _a : new privateUserFields_dto_1.PrivateUserFieldsDto() }));
        try {
            const result = await createdUserProfile.save();
            return userProfile_dto_1.UserProfileDto.assign(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async patchUserProfile(patchDto, userId) {
        try {
            const dto = dtoHelpers_1.cleanDtoFields(patchDto);
            const requestedDoc = await this.userProfileModel
                .findOne({ authId: userId })
                .exec();
            if (!requestedDoc)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const privateFieldsKeys = Object.keys(new privateUserFields_dto_1.PrivateUserFieldsDto());
            const privateFieldsPath = mongooseTableHelpers_1.getPrivateFieldsPropName();
            for (const key in dto) {
                if (privateFieldsKeys.includes(key)) {
                    requestedDoc[privateFieldsPath][key] = dto[key];
                    requestedDoc.markModified(privateFieldsPath);
                }
                else {
                    requestedDoc[key] = dto[key];
                }
            }
            await requestedDoc.save();
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async deleteUserProfile(userId) {
        try {
            const userProfile = await this.userProfileModel.findOne({
                authId: userId,
            });
            if (!userProfile)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const result = await this.userProfileModel.findOneAndDelete({
                authId: userId,
            });
            if (!result)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async getRecentActivity(userId, count) {
        try {
            const queryCount = parseInt(count);
            if (!queryCount)
                throw new common_1.BadRequestException();
            const result = [];
            const listsReq = this.userListsService.findMostRecentCreated(userId, 5, listType_1.ListType.Book);
            const itemsReq = this.buliService.findMostRecentUpdated(userId, queryCount);
            const complete = await Promise.all([listsReq, itemsReq]);
            const listsRes = complete[0];
            const itemsRes = complete[1];
            const includedCreatedLists = [];
            while ((listsRes.length || itemsRes.length) && result.length < 5) {
                if (listsRes[0] && itemsRes[0]) {
                    const paddedListDate = new Date(listsRes[0].createdAt.getTime() + 200);
                    if (paddedListDate > itemsRes[0].updatedAt) {
                        const userList = listsRes.shift();
                        this.addUserListToResult(userList, result);
                        includedCreatedLists.push(userList.id);
                    }
                    else {
                        const buli = itemsRes.shift();
                        if (!includedCreatedLists.includes(buli.userList)) {
                            this.addBULIToResult(buli, result);
                        }
                    }
                }
                else {
                    if (listsRes[0]) {
                        const userList = listsRes.shift();
                        this.addUserListToResult(userList, result);
                        includedCreatedLists.push(userList.id);
                    }
                    else {
                        const buli = itemsRes.shift();
                        if (!includedCreatedLists.includes(buli.userList)) {
                            this.addBULIToResult(buli, result);
                        }
                    }
                }
            }
            return new responseWrappers_1.DataTotalResponse(result);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async getActiveLists(userId, count) {
        try {
            const queryCount = parseInt(count);
            if (!queryCount)
                throw new common_1.BadRequestException();
            const userLists = await this.userListsService.findMostRecentActive(userId, queryCount, listType_1.ListType.Book);
            return new responseWrappers_1.DataTotalResponse(userLists);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    addUserListToResult(userList, result) {
        result.push(new recentActivity_1.RecentUserListActivity(userList.id, activityType_1.ActivityType.start, userList.createdAt, userList.list.title, userList.list.bookListItems.length));
    }
    addBULIToResult(buli, result) {
        result.push(new recentActivity_1.RecentBULIActivity(buli.userList, activityType_1.ActivityType.progress, buli.updatedAt, buli.status, buli.owned, buli.bookListItem.meta.title, buli.rating));
    }
};
BookUsersService = __decorate([
    common_1.Injectable(),
    __param(2, mongoose_1.InjectModel(userProfile_schema_1.UserProfile.name)),
    __metadata("design:paramtypes", [userLists_service_1.UserListsService,
        buli_service_1.BULIService,
        mongoose_2.Model])
], BookUsersService);
exports.BookUsersService = BookUsersService;
//# sourceMappingURL=bookUsers.service.js.map