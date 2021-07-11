import { Document } from 'mongoose';
export declare type PrivateUserFieldsDocument = PrivateUserFields & Document;
export declare const defaultRecentActivityCount = 5;
export declare const defaultActiveListsCount = 3;
export declare const defaultShowActivityOnPublicProfile = false;
export declare const defaultPubliclyShowUserStatistics = true;
export declare class PrivateUserFields {
    recentActivityCount: number;
    activeListsCount: number;
    showActivityOnPublicProfile: boolean;
    publiclyShowUserStatistics: boolean;
}
