"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentBULIActivity = exports.RecentUserListActivity = exports.RecentActivity = void 0;
const stringIdType_1 = require("../../common/types/stringIdType");
const userListItemStatus_1 = require("../../common/types/userListItemStatus");
class RecentActivity {
    constructor(identifier, type, timeStamp, data) {
        this.identifier = identifier;
        this.type = type;
        this.timeStamp = timeStamp;
        this.data = data;
    }
}
exports.RecentActivity = RecentActivity;
class RecentUserListActivity extends RecentActivity {
    constructor(identifier, type, timeStamp, title, bookCount) {
        super(identifier, type, timeStamp);
        this.identifier = identifier;
        this.type = type;
        this.timeStamp = timeStamp;
        this.title = title;
        this.bookCount = bookCount;
    }
}
exports.RecentUserListActivity = RecentUserListActivity;
class RecentBULIActivity extends RecentActivity {
    constructor(identifier, type, timeStamp, status, owned, title, rating) {
        super(identifier, type, timeStamp);
        this.identifier = identifier;
        this.type = type;
        this.timeStamp = timeStamp;
        this.status = status;
        this.owned = owned;
        this.title = title;
        this.rating = rating;
    }
}
exports.RecentBULIActivity = RecentBULIActivity;
//# sourceMappingURL=recentActivity.js.map