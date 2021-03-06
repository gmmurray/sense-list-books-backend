import { Document } from 'mongoose';
import { PrivateUserFields } from './privateUserFields.schema';
export declare type UserProfileDocument = UserProfile & Document;
export declare class UserProfile {
    authId: string;
    username: string;
    privateFields: PrivateUserFields;
    pinnedListId: string;
    createdAt: Date;
    updatedAt: Date;
    listCount: number;
}
export declare const UserProfileSchema: import("mongoose").Schema<Document<UserProfile, {}>, import("mongoose").Model<any, any>, undefined>;
