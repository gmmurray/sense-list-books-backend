"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchUserListDto = exports.CreateUserListDto = exports.UserListDto = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const stringIdType_1 = require("../../common/types/stringIdType");
const list_dto_1 = require("../../lists/definitions/list.dto");
const list_schema_1 = require("../../lists/definitions/list.schema");
const bookUserListItem_schema_1 = require("../../userListItems/books/definitions/bookUserListItem.schema");
const buli_dto_1 = require("../../userListItems/books/definitions/buli.dto");
class UserListDto {
    constructor(id, list, userId, notes, userListItems, createdAt, updatedAt) {
        this.id = id;
        this.list = list;
        this.userId = userId;
        this.notes = notes;
        this.userListItems = userListItems;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static assign(doc) {
        if (true || (doc.bookUserListItems && doc.bookUserListItems.length)) {
            let subList;
            if (doc.list instanceof mongoose_1.Document) {
                subList = list_dto_1.ListDto.assign(doc.list);
            }
            return new UserListDto(doc._id, subList || doc.list, doc.userId, doc.notes, doc.bookUserListItems, doc.createdAt, doc.updatedAt);
        }
        else {
            throw new common_1.NotImplementedException();
        }
    }
    static assignWithPopulatedDocuments(doc) {
        if (true || (doc.bookUserListItems && doc.bookUserListItems.length)) {
            return new UserListDto(doc._id, list_dto_1.ListDto.assign(doc.list), doc.userId, doc.notes, doc.bookUserListItems.map(item => buli_dto_1.BULIDto.assign(item)), doc.createdAt, doc.updatedAt);
        }
        else {
            throw new common_1.NotImplementedException();
        }
    }
    static assignWithPopulatedListOnly(doc) {
        if (true || (doc.bookUserListItems && doc.bookUserListItems.length)) {
            return new UserListDto(doc._id, list_dto_1.ListDto.assign(doc.list), doc.userId, doc.notes, doc.bookUserListItems, doc.createdAt, doc.updatedAt);
        }
        else {
            throw new common_1.NotImplementedException();
        }
    }
}
exports.UserListDto = UserListDto;
class CreateUserListDto {
    constructor(list, userId, notes) {
        this.list = list;
        this.userId = userId;
        this.notes = notes;
    }
}
exports.CreateUserListDto = CreateUserListDto;
class PatchUserListDto {
    constructor({ notes = undefined }) {
        this.notes = notes;
    }
}
exports.PatchUserListDto = PatchUserListDto;
//# sourceMappingURL=userList.dto.js.map