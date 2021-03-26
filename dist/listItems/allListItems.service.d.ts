import { ClientSession } from 'mongoose';
import { ListType } from 'src/common/types/listType';
import { StringIdType } from 'src/common/types/stringIdType';
import { BookListItemsService } from './books/bookListItem.service';
export declare class AllListItemsService {
    private readonly bookService;
    constructor(bookService: BookListItemsService);
    deleteAllItemsByList(userId: string, listId: StringIdType, listType: ListType, session: ClientSession): Promise<void>;
}
