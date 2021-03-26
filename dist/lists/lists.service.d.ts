import { ClientSession, Connection, FilterQuery, Model, Types } from 'mongoose';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { List, ListDocument } from './definitions/list.schema';
import { CreateListDto, ListDto, PatchListDto, QueryListDto } from './definitions/list.dto';
import { UserListsService } from 'src/userLists/userLists.service';
import { AllListItemsService } from 'src/listItems/allListItems.service';
import { StringIdType } from 'src/common/types/stringIdType';
export declare class ListsService {
    private listModel;
    private connection;
    private readonly allListItemsService;
    private readonly userListsService;
    constructor(listModel: Model<ListDocument>, connection: Connection, allListItemsService: AllListItemsService, userListsService: UserListsService);
    findAll(userId: string): Promise<DataTotalResponse<ListDto>>;
    findByQuery(queryListDto: QueryListDto, userId: string): Promise<DataTotalResponse<ListDto>>;
    findById(listId: string, userId: string): Promise<ListDto>;
    create(createListDto: CreateListDto, userId: string): Promise<ListDto>;
    patch(listId: string, patchListDto: PatchListDto, userId: string): Promise<void>;
    delete(listId: string, userId: string): Promise<void>;
    getListWithReadAccess(userId: string, listId: StringIdType): Promise<ListDocument>;
    getListWithWriteAccess(userId: string, listId: StringIdType): Promise<ListDocument>;
    updateListItemsInList(listId: Types.ObjectId, userId: string, operation: '$pull' | '$push', field: string, value: StringIdType, session: ClientSession): Promise<void>;
    private static getQueryFilter;
    static hasListSchemaReadAccess(userId: string): FilterQuery<List>;
    static hasListSchemaWriteAccess(userId: string): FilterQuery<List>;
    static isListSchemaOwner(userId: string): FilterQuery<List>;
    static isPublicButNotOwner(userId: string): FilterQuery<List>;
}
