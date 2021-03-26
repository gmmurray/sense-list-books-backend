import { Document, Types } from 'mongoose';
import { ListType } from 'src/common/types/listType';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';
export declare type ListDocument = List & Document;
export declare class List {
    isPublic: boolean;
    title: string;
    description: string;
    type: ListType;
    category: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    bookListItems: BookListItemDocument[] | Types.ObjectId[];
}
export declare const ListSchema: import("mongoose").Schema<Document<List, {}>, import("mongoose").Model<any, any>, undefined>;
