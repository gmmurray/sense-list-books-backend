import { AuthRequest } from 'src/authz/authzUser';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { RecentActivity } from '../definitions/recentActivity';
import { BookUsersService } from './bookUsers.service';
export declare class BookUsersController {
    private readonly bookUsersService;
    constructor(bookUsersService: BookUsersService);
    getRecentActivity({ user }: AuthRequest, count: string): Promise<DataTotalResponse<RecentActivity>>;
    getActiveLists({ user }: AuthRequest, count: string): Promise<DataTotalResponse<UserListDto>>;
}
