import { ClientSession, Connection, Model, Types } from 'mongoose';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { UserListsService } from 'src/userLists/userLists.service';
import { UserListItemsService } from '../userListItem.service';
import { BookUserListItemDocument } from './definitions/bookUserListItem.schema';
import { BULIDto, CreateBULIDto, PatchBULIDto } from './definitions/buli.dto';
import { StringIdType } from 'src/common/types/stringIdType';
import { UserStatistics } from 'src/users/definitions/statistics/userStatistics';
export declare class BULIService extends UserListItemsService<BookUserListItemDocument, BULIDto, CreateBULIDto, PatchBULIDto> {
    readonly bookModel: Model<BookUserListItemDocument>;
    private connection;
    readonly userListService: UserListsService;
    constructor(bookModel: Model<BookUserListItemDocument>, connection: Connection, userListService: UserListsService);
    findAll(userId: string): Promise<DataTotalResponse<BULIDto>>;
    findAllPopulated(userId: string): Promise<DataTotalResponse<BULIDto>>;
    findAllByUserList(userId: string, userListId: StringIdType): Promise<DataTotalResponse<BULIDto>>;
    findById(userId: string, userListItemId: StringIdType): Promise<BULIDto>;
    create(userId: string, createDto: CreateBULIDto): Promise<BULIDto>;
    patch(userId: string, buliId: StringIdType, patchDto: PatchBULIDto): Promise<void>;
    delete(userId: string, userListItemId: StringIdType): Promise<void>;
    findMostRecentUpdated(userId: string, count: number): Promise<BULIDto[]>;
    createDefaultItemsForList(userId: string, userListId: StringIdType, bookListItems: Types.ObjectId[], session: ClientSession): Promise<BookUserListItemDocument[]>;
    findAllBySingleListItem(userId: string, listItemId: StringIdType): Promise<BookUserListItemDocument[]>;
    findAllBySingleListItemWithoutUser(listItemId: StringIdType): Promise<BookUserListItemDocument[]>;
    findAllByListItems(userId: string, listItemIds: Types.ObjectId[]): Promise<BookUserListItemDocument[]>;
    findAllByListItemsWithoutUser(listItemIds: Types.ObjectId[]): Promise<BookUserListItemDocument[]>;
    getAggregateItemStatistics(userId: string): Promise<Partial<UserStatistics>>;
}
