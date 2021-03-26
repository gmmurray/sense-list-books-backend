import { Document, Types } from 'mongoose';
import { ListDocument } from 'src/lists/definitions/list.schema';
import { BookUserListItemDocument } from 'src/userListItems/books/definitions/bookUserListItem.schema';
export declare type UserListDocument = UserList & Document;
export declare class UserList {
    list: ListDocument | Types.ObjectId;
    userId: string;
    notes: string;
    bookUserListItems: BookUserListItemDocument[] | Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserListSchema: import("mongoose").Schema<Document<UserList, {}>, import("mongoose").Model<any, any>, undefined>;
