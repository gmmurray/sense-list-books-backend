"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBULI = void 0;
const mongoose_1 = require("mongoose");
const bookFormatType_1 = require("../../../common/types/bookFormatType");
const stringIdType_1 = require("../../../common/types/stringIdType");
const userListItemStatus_1 = require("../../../common/types/userListItemStatus");
const bookListItem_schema_1 = require("../../../listItems/books/definitions/bookListItem.schema");
const userList_schema_1 = require("../../../userLists/definitions/userList.schema");
class DefaultBULI {
    constructor(userList, userId, notes, bookListItem, status, owned, format, rating) {
        this.userList = userList;
        this.userId = userId;
        this.notes = notes;
        this.bookListItem = bookListItem;
        this.status = status;
        this.owned = owned;
        this.format = format;
        this.rating = rating;
    }
    static createDefault(userId, userListId, bookListItemId) {
        return new DefaultBULI(new mongoose_1.Types.ObjectId(userListId), userId, '', new mongoose_1.Types.ObjectId(bookListItemId), userListItemStatus_1.BookReadingStatus.notStarted, false, null, null);
    }
}
exports.DefaultBULI = DefaultBULI;
//# sourceMappingURL=defaultBULI.js.map