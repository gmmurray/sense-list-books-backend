import { ClientSession, Connection, Document, Model, Types } from 'mongoose';
import { ListType } from 'src/common/types/listType';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { UserListsService } from 'src/userLists/userLists.service';
import { UserListItemDocument } from './definitions/userListItem.schema';
import { StringIdType } from 'src/common/types/stringIdType';
export declare abstract class UserListItemsService<T extends UserListItemDocument & Document, D, C, P> {
    private readonly model;
    private readonly dbConnection;
    private readonly userListsService;
    private readonly modelName;
    constructor(model: Model<T>, dbConnection: Connection, userListsService: UserListsService);
    abstract findAll(userId: string): Promise<DataTotalResponse<D>>;
    abstract findAllByUserList(userId: string, userListId: StringIdType): Promise<DataTotalResponse<D>>;
    abstract findById(userId: string, userListItemId: StringIdType): Promise<D>;
    abstract create(userId: string, createDto: C): Promise<D>;
    abstract createDefaultItemsForList(userId: string, userListId: StringIdType, listItems: Types.ObjectId[], session: ClientSession): Promise<UserListItemDocument[]>;
    abstract patch(userId: string, userListItemId: StringIdType, patchDto: P): Promise<void>;
    delete(userId: string, userListItemId: StringIdType, listType: ListType): Promise<void>;
    abstract findAllBySingleListItem(userId: string, listItemId: StringIdType): Promise<UserListItemDocument[]>;
    abstract findAllBySingleListItemWithoutUser(listItemId: StringIdType): Promise<UserListItemDocument[]>;
    abstract findAllByListItems(userId: string, listItemIds: Types.ObjectId[]): Promise<UserListItemDocument[]>;
    abstract findAllByListItemsWithoutUser(listItemIds: Types.ObjectId[]): Promise<UserListItemDocument[]>;
    deleteAllUserItemsByUserList(userListId: StringIdType, session: ClientSession): Promise<void>;
    deleteAllUserItemsByIds(userId: string, userItemIds: Types.ObjectId[], itemField: string, session: ClientSession): Promise<void>;
    private static hasUserListItemWriteAccess;
}
