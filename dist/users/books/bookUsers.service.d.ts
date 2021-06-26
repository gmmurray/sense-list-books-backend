import { Model } from 'mongoose';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { BULIService } from 'src/userListItems/books/buli.service';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { UserListsService } from 'src/userLists/userLists.service';
import { RecentActivity } from '../definitions/recentActivity';
import { CreateUserProfileDto, PatchUserProfileDto, UserProfileDto } from '../definitions/userProfiles/userProfile.dto';
import { UserProfileDocument } from '../definitions/userProfiles/userProfile.schema';
export declare class BookUsersService {
    private readonly userListsService;
    private readonly buliService;
    private userProfileModel;
    constructor(userListsService: UserListsService, buliService: BULIService, userProfileModel: Model<UserProfileDocument>);
    findUserProfile(authId: string, userId: string): Promise<UserProfileDto>;
    createUserProfile(createDto: CreateUserProfileDto, userId: string): Promise<UserProfileDto>;
    patchUserProfile(patchDto: PatchUserProfileDto, userId: string): Promise<void>;
    deleteUserProfile(userId: string): Promise<void>;
    getRecentActivity(userId: string, count: string | number): Promise<DataTotalResponse<RecentActivity>>;
    getActiveLists(userId: string, count: string): Promise<DataTotalResponse<UserListDto>>;
    private addUserListToResult;
    private addBULIToResult;
}
