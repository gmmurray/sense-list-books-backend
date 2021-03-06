import { AuthRequest } from 'src/authz/authzUser';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { UserStatistics } from '../definitions/statistics/userStatistics';
import { CreateUserProfileDto, PatchUserProfileDto, UserProfileDto } from '../definitions/userProfiles/userProfile.dto';
import { BookUsersService } from './bookUsers.service';
export declare class BookUsersController {
    private readonly bookUsersService;
    constructor(bookUsersService: BookUsersService);
    getUserProfileByAuthId({ user }: AuthRequest, authId: string): Promise<UserProfileDto>;
    createUserProfile({ user }: AuthRequest, createDto: CreateUserProfileDto): Promise<UserProfileDto>;
    patchUserProfile({ user }: AuthRequest, updates: PatchUserProfileDto): Promise<void>;
    deleteUserProfile({ user }: AuthRequest): Promise<void>;
    getActiveLists({ user }: AuthRequest, count: string): Promise<DataTotalResponse<UserListDto>>;
    getUserStatistics({ user }: AuthRequest, authId: string): Promise<UserStatistics>;
    registerUser({ user }: AuthRequest, createDto: CreateUserProfileDto): Promise<void>;
}
