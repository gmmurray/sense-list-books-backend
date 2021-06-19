import { PrivateUserFieldsDto } from './privateUserFields.dto';
import { UserProfileDocument } from './userProfile.schema';
export declare class UserProfileDto {
    authId: string;
    username: string;
    privateFields: PrivateUserFieldsDto;
    createdAt: Date;
    updatedAt: Date;
    constructor(authId: string, username: string, privateFields: PrivateUserFieldsDto, createdAt: Date, updatedAt: Date);
    isProfileOwner(userId: string): boolean;
    hidePrivateFields(userId: string): UserProfileDto;
    static assign(doc: UserProfileDocument): UserProfileDto;
}
export declare class QueryUserProfileDto {
    username?: string;
}
export declare class CreateUserProfileDto {
    authId?: string;
    username?: string;
    privateFields?: PrivateUserFieldsDto;
    constructor(authId?: string, username?: string, privateFields?: PrivateUserFieldsDto);
}
export declare class PatchUserProfileDto {
    username?: string;
    recentActivityCount?: number;
    activeListsCount?: number;
    showActivityOnPublicProfile?: boolean;
    constructor({ username, recentActivityCount, activeListsCount, showActivityOnPublicProfile, }: {
        username?: any;
        recentActivityCount?: any;
        activeListsCount?: any;
        showActivityOnPublicProfile?: any;
    });
}
