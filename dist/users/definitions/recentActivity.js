"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentListActivity = exports.RecentBULIActivity = exports.RecentUserListActivity = exports.RecentActivity = void 0;
const stringIdType_1 = require("../../common/types/stringIdType");
const userListItemStatus_1 = require("../../common/types/userListItemStatus");
const activityType_1 = require("./activityType");
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
    constructor(identifier, type = activityType_1.ActivityType.start, timeStamp, title, bookCount) {
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
    constructor(identifier, type = activityType_1.ActivityType.progress, timeStamp, status, owned, title, rating) {
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
class RecentListActivity extends RecentActivity {
    constructor(identifier, type, timeStamp, title) {
        super(identifier, type, timeStamp);
        this.identifier = identifier;
        this.type = type;
        this.timeStamp = timeStamp;
        this.title = title;
    }
}
exports.RecentListActivity = RecentListActivity;
//# sourceMappingURL=recentActivity.js.map