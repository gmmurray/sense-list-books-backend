import { ClientSession, Connection, Model, Types } from 'mongoose';
import { ListType } from 'src/common/types/listType';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { ListDocument } from 'src/lists/definitions/list.schema';
import { ListsService } from 'src/lists/lists.service';
import { AllUserListItemsService } from 'src/userListItems/allUserListItems.service';
import { BULIService } from 'src/userListItems/books/buli.service';
import { CreateUserListDto, PatchUserListDto, UserListDto } from './definitions/userList.dto';
import { UserListDocument } from './definitions/userList.schema';
import { StringIdType } from 'src/common/types/stringIdType';
export declare class UserListsService {
    readonly model: Model<UserListDocument>;
    private connection;
    private readonly listsService;
    private readonly bookUserListItemsService;
    private readonly allUserListItemsService;
    constructor(model: Model<UserListDocument>, connection: Connection, listsService: ListsService, bookUserListItemsService: BULIService, allUserListItemsService: AllUserListItemsService);
    findAll(userId: string): Promise<DataTotalResponse<UserListDto>>;
    getPopulatedUserList(userId: string, userListId: string): Promise<UserListDto>;
    create(userId: string, createDto: CreateUserListDto): Promise<UserListDto>;
    patch(userId: string, userListId: string, patchDto: PatchUserListDto): Promise<void>;
    delete(userId: string, userListId: StringIdType): Promise<void>;
    findMostRecentCreated(userId: string, count: number, type: ListType): Promise<UserListDto[]>;
    findMostRecentActive(userId: string, count: number, type: ListType): Promise<UserListDto[]>;
    updateItemsInUserList(userId: string, userListId: StringIdType, operation: '$pull' | '$push', field: string, value: string | Types.ObjectId | {
        $in: string[] | Types.ObjectId[];
    } | {
        $each: string[] | Types.ObjectId[];
    }, session: ClientSession): Promise<void>;
    updateItemsInAllUserLists(userId: string, operation: '$pull' | '$push', field: string, value: string | Types.ObjectId | {
        $in: string[] | Types.ObjectId[];
    } | {
        $each: string[] | Types.ObjectId[];
    }, session: ClientSession): Promise<void>;
    deleteAllUserListsByList(listId: StringIdType, session: ClientSession): Promise<void>;
    findUserListById(userListId: StringIdType): Promise<UserListDocument>;
    hasListReadAccess(userId: string, listId: StringIdType): Promise<ListDocument>;
    private static hasUserListWriteAccess;
}
