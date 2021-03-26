import { Document } from 'mongoose';
import { ListItem } from '../../definitions/listItem.schema';
import { BookListItemMeta } from './bookListItem';
export declare type BookListItemDocument = BookListItem & ListItem & Document;
export declare class BookListItem extends ListItem {
    isbn: string;
    volumeId: string;
    meta: BookListItemMeta;
}
export declare const BookListItemSchema: import("mongoose").Schema<Document<BookListItem, {}>, import("mongoose").Model<any, any>, undefined>;
