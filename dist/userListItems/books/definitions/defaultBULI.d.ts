import { Types } from 'mongoose';
import { BookFormatType } from 'src/common/types/bookFormatType';
import { StringIdType } from 'src/common/types/stringIdType';
import { BookReadingStatus } from 'src/common/types/userListItemStatus';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';
import { UserListDocument } from 'src/userLists/definitions/userList.schema';
export declare class DefaultBULI {
    userList: Types.ObjectId | UserListDocument;
    userId: string;
    notes: string;
    bookListItem: Types.ObjectId | BookListItemDocument;
    status: BookReadingStatus;
    owned: boolean;
    format: BookFormatType;
    rating?: number | null;
    constructor(userList: Types.ObjectId | UserListDocument, userId: string, notes: string, bookListItem: Types.ObjectId | BookListItemDocument, status: BookReadingStatus, owned: boolean, format: BookFormatType, rating?: number | null);
    static createDefault(userId: string, userListId: StringIdType, bookListItemId: StringIdType): DefaultBULI;
}
