import { ClientSession, Connection, Document, Model, Types } from 'mongoose';
import { ListType } from 'src/common/types/listType';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { ListDocument } from 'src/lists/definitions/list.schema';
import { ListsService } from 'src/lists/lists.service';
import { AllUserListItemsService } from 'src/userListItems/allUserListItems.service';
import { ListItemDocument } from './definitions/listItem.schema';
import { StringIdType } from 'src/common/types/stringIdType';
import { UpdateListItemOrdinalsDto } from './definitions/listItem.dto';
export declare abstract class ListItemsService<T extends ListItemDocument & Document, D, C, Q, P> {
    private readonly model;
    private readonly dbConnection;
    private readonly listsService;
    private readonly allUserListItemsService;
    private readonly modelName;
    constructor(model: Model<T>, dbConnection: Connection, listsService: ListsService, allUserListItemsService: AllUserListItemsService);
    abstract findAll(userId: string, listId: string): Promise<DataTotalResponse<D>>;
    abstract findByQuery(userId: string, listId: string, queryDto: Q): Promise<DataTotalResponse<D>>;
    abstract findById(userId: string, listItemId: string): Promise<D>;
    abstract create(createDto: C, userId: string): Promise<D>;
    abstract patch(userId: string, listItemId: string, patchDto: P): Promise<void>;
    updateListItemOrdinals(userId: string, updates: UpdateListItemOrdinalsDto): Promise<void>;
    delete(userId: string, listItemId: string, listType: ListType): Promise<void>;
    deleteAllItemsByList(userId: string, listId: StringIdType, session: ClientSession, listType: ListType, itemIds: Types.ObjectId[]): Promise<void>;
    hasListItemWriteAccess(userId: string, listId: StringIdType): Promise<ListDocument>;
    hasListItemReadAccess(userId: string, listId: StringIdType): Promise<ListDocument>;
    private static validListItemOrdinals;
}
