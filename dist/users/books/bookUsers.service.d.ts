import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { BULIService } from 'src/userListItems/books/buli.service';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { UserListsService } from 'src/userLists/userLists.service';
import { RecentActivity } from '../definitions/recentActivity';
export declare class BookUsersService {
    private readonly userListsService;
    private readonly buliService;
    constructor(userListsService: UserListsService, buliService: BULIService);
    getRecentActivity(userId: string, count: string): Promise<DataTotalResponse<RecentActivity>>;
    getActiveLists(userId: string, count: string): Promise<DataTotalResponse<UserListDto>>;
    private addUserListToResult;
    private addBULIToResult;
}
