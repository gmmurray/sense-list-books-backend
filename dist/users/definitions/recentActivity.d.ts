import { StringIdType } from 'src/common/types/stringIdType';
import { BookReadingStatus } from 'src/common/types/userListItemStatus';
import { ActivityType } from './activityType';
export declare class RecentActivity {
    identifier: StringIdType;
    type: ActivityType;
    timeStamp: Date;
    data?: Record<string, any>;
    constructor(identifier: StringIdType, type: ActivityType, timeStamp: Date, data?: Record<string, any>);
}
export declare class RecentUserListActivity extends RecentActivity {
    identifier: StringIdType;
    type: ActivityType;
    timeStamp: Date;
    title: string;
    bookCount: number;
    constructor(identifier: StringIdType, type: ActivityType, timeStamp: Date, title: string, bookCount: number);
}
export declare class RecentBULIActivity extends RecentActivity {
    identifier: StringIdType;
    type: ActivityType;
    timeStamp: Date;
    status: BookReadingStatus;
    owned: boolean;
    title: string;
    rating?: number | null;
    constructor(identifier: StringIdType, type: ActivityType, timeStamp: Date, status: BookReadingStatus, owned: boolean, title: string, rating?: number | null);
}
export declare class RecentListActivity extends RecentActivity {
    identifier: StringIdType;
    type: ActivityType;
    timeStamp: Date;
    title: string;
    constructor(identifier: StringIdType, type: ActivityType, timeStamp: Date, title: string);
}
