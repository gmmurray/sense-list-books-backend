import { AuthRequest } from 'src/authz/authzUser';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { CreateUserListDto, PatchUserListDto, UserListDto } from './definitions/userList.dto';
import { UserListsService } from './userLists.service';
export declare class UserListsController {
    private readonly userListsService;
    constructor(userListsService: UserListsService);
    index({ user }: AuthRequest): Promise<DataTotalResponse<UserListDto>>;
    getPopulatedUserList({ user }: AuthRequest, userListId: string): Promise<UserListDto>;
    create({ user }: AuthRequest, createDto: CreateUserListDto): Promise<UserListDto>;
    patch({ user }: AuthRequest, userListId: string, updates: PatchUserListDto): Promise<void>;
    delete({ user }: AuthRequest, userListId: string): Promise<void>;
}
