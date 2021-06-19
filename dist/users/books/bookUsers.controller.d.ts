import { AuthRequest } from 'src/authz/authzUser';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { RecentActivity } from '../definitions/recentActivity';
import { CreateUserProfileDto, PatchUserProfileDto, UserProfileDto } from '../definitions/userProfiles/userProfile.dto';
import { BookUsersService } from './bookUsers.service';
export declare class BookUsersController {
    private readonly bookUsersService;
    constructor(bookUsersService: BookUsersService);
    getUserProfileByAuthId({ user }: AuthRequest, authId: string): Promise<UserProfileDto>;
    createUserProfile({ user }: AuthRequest, createDto: CreateUserProfileDto): Promise<UserProfileDto>;
    patchUserProfile({ user }: AuthRequest, updates: PatchUserProfileDto): Promise<void>;
    deleteUserProfile({ user }: AuthRequest): Promise<void>;
    getRecentActivity({ user }: AuthRequest, count: string): Promise<DataTotalResponse<RecentActivity>>;
    getActiveLists({ user }: AuthRequest, count: string): Promise<DataTotalResponse<UserListDto>>;
}
