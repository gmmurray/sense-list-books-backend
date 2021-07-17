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
const roles_1 = require("../../authz/roles");
const authz_service_1 = require("../../authz/service/authz.service");
const dtoHelpers_1 = require("../../common/dtoHelpers");
const exceptionWrappers_1 = require("../../common/exceptionWrappers");
const mongooseTableHelpers_1 = require("../../common/mongooseTableHelpers");
const listType_1 = require("../../common/types/listType");
const responseWrappers_1 = require("../../common/types/responseWrappers");
const stringIdType_1 = require("../../common/types/stringIdType");
const activity_1 = require("../../constants/activity");
const bookListItem_dto_1 = require("../../listItems/books/definitions/bookListItem.dto");
const list_dto_1 = require("../../lists/definitions/list.dto");
const lists_service_1 = require("../../lists/lists.service");
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
    constructor(userListsService, buliService, listsService, authzService, userProfileModel) {
        this.userListsService = userListsService;
        this.buliService = buliService;
        this.listsService = listsService;
        this.authzService = authzService;
        this.userProfileModel = userProfileModel;
    }
    async findUserProfile(authId, userId) {
        try {
            const userProfile = await this.userProfileModel
                .findOne({ authId })
                .populate(mongooseTableHelpers_1.getUserProfileListCountPropName());
            if (!userProfile)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            const recentActivity = await this.getRecentActivity(userId, userProfile);
            return userProfile_dto_1.UserProfileDto.assign(userProfile, recentActivity.data || []).hidePrivateFields(userId);
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
            return userProfile_dto_1.UserProfileDto.assign(result, null);
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async getUserStatistics(authId, userId) {
        const isStatisticsOwner = authId == userId;
        try {
            const userProfileSettings = await this.getUserProfileSettings(authId);
            if (!userProfileSettings ||
                (!isStatisticsOwner && !userProfileSettings.publiclyShowUserStatistics)) {
                return null;
            }
            const requests = [
                this.buliService.getAggregateItemStatistics(authId),
            ];
            if (isStatisticsOwner) {
                requests.push(this.listsService.getAllListsByUser(authId));
            }
            else {
                requests.push(this.listsService.getPublicListsByUser(authId));
            }
            const [userItemStatistics, listsByUser] = await Promise.all(requests);
            return Object.assign(Object.assign({}, userItemStatistics), { listCount: listsByUser.length });
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
    async getRecentActivity(userId, userProfile) {
        try {
            if (!userProfile)
                throw new common_1.BadRequestException();
            const { authId, privateFields: { recentActivityCount, showActivityOnPublicProfile }, } = userProfile;
            const count = recentActivityCount || activity_1.RECENT_ACTIVITY_COUNT;
            const isOwnProfile = userId == authId;
            const result = [];
            const requests = [];
            requests.push(this.listsService.findMostRecentCreated(authId, count, isOwnProfile));
            requests.push(this.listsService.findMostRecentUpdated(authId, count, isOwnProfile));
            if (showActivityOnPublicProfile || isOwnProfile) {
                requests.push(this.userListsService.findMostRecentCreated(authId, count, listType_1.ListType.Book));
                requests.push(this.buliService.findMostRecentUpdated(authId, count));
            }
            const completed = await Promise.all(requests);
            const createdListsRes = completed[0];
            const updatedListsRes = completed[1];
            const processedListIds = [];
            while (createdListsRes.length || updatedListsRes.length) {
                const currentCreatedList = createdListsRes[0];
                const currentUpdatedList = updatedListsRes[0];
                const listsToAdd = [];
                if (currentCreatedList &&
                    processedListIds.some(id => id.equals(currentCreatedList.id))) {
                    createdListsRes.shift();
                    continue;
                }
                else if (currentUpdatedList &&
                    processedListIds.some(id => id.equals(currentUpdatedList.id))) {
                    updatedListsRes.shift();
                    continue;
                }
                if (currentCreatedList && currentUpdatedList) {
                    if (currentCreatedList.id.equals(currentUpdatedList.id)) {
                        const paddedCreatedTime = new Date(currentCreatedList.createdAt.getTime() + 200);
                        const paddedUpdatedTime = new Date(currentUpdatedList.updatedAt.getTime() + 200);
                        if (Math.abs(paddedCreatedTime.getUTCMilliseconds() -
                            paddedUpdatedTime.getUTCMilliseconds()) < 500) {
                            listsToAdd.push({
                                addedList: currentCreatedList,
                                type: activityType_1.ActivityType.createdList,
                                source: createdListsRes,
                            });
                            processedListIds.push(currentCreatedList.id);
                        }
                        else {
                            if (paddedCreatedTime >= paddedUpdatedTime) {
                                listsToAdd.push({
                                    addedList: currentCreatedList,
                                    type: activityType_1.ActivityType.createdList,
                                    source: createdListsRes,
                                });
                                processedListIds.push(currentCreatedList.id);
                            }
                            else {
                                listsToAdd.push({
                                    addedList: currentUpdatedList,
                                    type: activityType_1.ActivityType.updatedList,
                                    source: updatedListsRes,
                                });
                                processedListIds.push(currentUpdatedList.id);
                            }
                        }
                    }
                    else {
                        listsToAdd.push({
                            addedList: currentCreatedList,
                            type: activityType_1.ActivityType.createdList,
                            source: createdListsRes,
                        }, {
                            addedList: currentUpdatedList,
                            type: activityType_1.ActivityType.updatedList,
                            source: updatedListsRes,
                        });
                        processedListIds.push(currentCreatedList.id, currentUpdatedList.id);
                    }
                }
                else {
                    if (currentCreatedList) {
                        listsToAdd.push({
                            addedList: currentCreatedList,
                            type: activityType_1.ActivityType.createdList,
                            source: createdListsRes,
                        });
                        processedListIds.push(currentCreatedList.id);
                    }
                    else if (currentUpdatedList) {
                        listsToAdd.push({
                            addedList: currentUpdatedList,
                            type: activityType_1.ActivityType.updatedList,
                            source: updatedListsRes,
                        });
                        processedListIds.push(currentUpdatedList.id);
                    }
                }
                listsToAdd.forEach(({ addedList, type, source }) => {
                    this.addListToResult(addedList, type, result);
                    source.shift();
                });
            }
            if (showActivityOnPublicProfile) {
                const userListsRes = completed[2];
                const itemsRes = completed[3];
                const includedCreatedUserLists = [];
                while (userListsRes.length || itemsRes.length) {
                    if (userListsRes[0] && itemsRes[0]) {
                        const paddedListDate = new Date(userListsRes[0].createdAt.getTime() + 200);
                        if (paddedListDate > itemsRes[0].updatedAt) {
                            const userList = userListsRes.shift();
                            this.addUserListToResult(userList, result);
                            includedCreatedUserLists.push(userList.id);
                        }
                        else {
                            const buli = itemsRes.shift();
                            if (!includedCreatedUserLists.includes(buli.userList)) {
                                this.addBULIToResult(buli, result);
                            }
                        }
                    }
                    else {
                        if (userListsRes[0]) {
                            const userList = userListsRes.shift();
                            this.addUserListToResult(userList, result);
                            includedCreatedUserLists.push(userList.id);
                        }
                        else {
                            const buli = itemsRes.shift();
                            if (!includedCreatedUserLists.includes(buli.userList)) {
                                this.addBULIToResult(buli, result);
                            }
                        }
                    }
                }
            }
            const sortedAndTrimmedResult = result
                .sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime())
                .slice(0, count);
            return new responseWrappers_1.DataTotalResponse(sortedAndTrimmedResult);
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
    async registerUser(createDto, userId) {
        try {
            const authzUser = await this.authzService.getUserById({ id: userId });
            if (!authzUser) {
                throw new common_1.NotFoundException(null, 'The user could not be found');
            }
            await this.authzService.assignRolesToUser({ id: userId }, { roles: [roles_1.userRoleId] });
            const existingProfile = await this.userProfileModel
                .findOne({ authId: userId })
                .exec();
            if (!existingProfile) {
                const newProfile = await this.createUserProfile(createDto, userId);
                if (!newProfile) {
                    throw exceptionWrappers_1.internalServerError({
                        message: 'Error registering user profile',
                    });
                }
            }
        }
        catch (error) {
            exceptionWrappers_1.handleHttpRequestError(error);
        }
    }
    async getUserProfileSettings(authId) {
        try {
            const userProfile = await this.userProfileModel
                .findOne({ authId })
                .populate(mongooseTableHelpers_1.getUserProfileListCountPropName());
            if (!userProfile)
                throw new mongoose_2.Error.DocumentNotFoundError(null);
            return userProfile_dto_1.UserProfileDto.assign(userProfile, null).privateFields;
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
    addListToResult(list, activityType, result) {
        const timeStamp = activityType === activityType_1.ActivityType.createdList
            ? list.createdAt
            : list.updatedAt;
        result.push(new recentActivity_1.RecentListActivity(list.id, activityType, timeStamp, list.title));
    }
};
BookUsersService = __decorate([
    common_1.Injectable(),
    __param(4, mongoose_1.InjectModel(userProfile_schema_1.UserProfile.name)),
    __metadata("design:paramtypes", [userLists_service_1.UserListsService,
        buli_service_1.BULIService,
        lists_service_1.ListsService,
        authz_service_1.AuthzService,
        mongoose_2.Model])
], BookUsersService);
exports.BookUsersService = BookUsersService;
//# sourceMappingURL=bookUsers.service.js.map