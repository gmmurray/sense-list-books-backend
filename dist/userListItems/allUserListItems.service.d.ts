import { ClientSession, Model, Types } from 'mongoose';
import { ListType } from 'src/common/types/listType';
import { BULIService } from './books/buli.service';
import { BookUserListItemDocument } from './books/definitions/bookUserListItem.schema';
import { StringIdType } from 'src/common/types/stringIdType';
export declare class AllUserListItemsService {
    readonly bookItems: Model<BookUserListItemDocument>;
    private readonly bookService;
    constructor(bookItems: Model<BookUserListItemDocument>, bookService: BULIService);
    deleteAllUserItemsBySingleListItem(userId: string, listItemId: StringIdType, listType: ListType, session: ClientSession): Promise<void>;
    deleteAllUserItemsByListItems(userId: string, listItemIds: Types.ObjectId[], listType: ListType, session: ClientSession): Promise<void>;
    deleteAllUserItemsByUserList(userListId: StringIdType, listType: ListType, session: ClientSession): Promise<void>;
}
