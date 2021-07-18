import { RecentActivity } from '../recentActivity';
import { PrivateUserFieldsDto } from './privateUserFields.dto';
import { UserProfileDocument } from './userProfile.schema';
export declare class UserProfileDto {
    authId: string;
    username: string;
    privateFields: PrivateUserFieldsDto;
    pinnedListId: string;
    listCount: number | null;
    createdAt: Date;
    updatedAt: Date;
    recentActivity: RecentActivity[];
    constructor(authId: string, username: string, privateFields: PrivateUserFieldsDto, pinnedListId: string, listCount: number | null, createdAt: Date, updatedAt: Date, recentActivity: RecentActivity[]);
    isProfileOwner(userId: string): boolean;
    hidePrivateFields(userId: string): UserProfileDto;
    static assign(doc: UserProfileDocument, recentActivity: RecentActivity[]): UserProfileDto;
}
export declare class QueryUserProfileDto {
    username?: string;
}
export declare class CreateUserProfileDto {
    username: string;
    authId: string;
    privateFields?: PrivateUserFieldsDto;
    constructor(username: string, authId: string, privateFields?: PrivateUserFieldsDto);
}
export declare class PatchUserProfileDto {
    username?: string;
    pinnedListId?: string;
    recentActivityCount?: number;
    activeListsCount?: number;
    showActivityOnPublicProfile?: boolean;
    constructor({ username, pinnedListId, recentActivityCount, activeListsCount, showActivityOnPublicProfile, }: {
        username?: any;
        pinnedListId?: any;
        recentActivityCount?: any;
        activeListsCount?: any;
        showActivityOnPublicProfile?: any;
    });
}
