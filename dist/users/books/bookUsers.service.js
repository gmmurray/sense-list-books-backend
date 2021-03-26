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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookUsersService = void 0;
const common_1 = require("@nestjs/common");
const exceptionWrappers_1 = require("../../common/exceptionWrappers");
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
let BookUsersService = class BookUsersService {
    constructor(userListsService, buliService) {
        this.userListsService = userListsService;
        this.buliService = buliService;
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
    __metadata("design:paramtypes", [userLists_service_1.UserListsService,
        buli_service_1.BULIService])
], BookUsersService);
exports.BookUsersService = BookUsersService;
//# sourceMappingURL=bookUsers.service.js.map