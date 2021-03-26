import { Document, Types } from 'mongoose';
import { UserListDocument } from 'src/userLists/definitions/userList.schema';
export declare type UserListItemDocument = UserListItem & Document;
export declare class UserListItem {
    userList: UserListDocument | Types.ObjectId;
    userId: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
