import { Document, Types } from 'mongoose';
import { BookFormatType } from 'src/common/types/bookFormatType';
import { BookReadingStatus } from 'src/common/types/userListItemStatus';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';
import { UserListItem } from '../../definitions/userListItem.schema';
export declare type BookUserListItemDocument = BookUserListItem & UserListItem & Document;
export declare class BookUserListItem extends UserListItem {
    bookListItem: BookListItemDocument | Types.ObjectId;
    status: BookReadingStatus;
    owned: boolean;
    rating: number | null;
    format: BookFormatType;
}
export declare const BookUserListItemSchema: import("mongoose").Schema<Document<BookUserListItem, {}>, import("mongoose").Model<any, any>, undefined>;
