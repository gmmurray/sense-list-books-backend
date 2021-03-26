import { Types } from 'mongoose';
import { StringIdType } from 'src/common/types/stringIdType';
import { ListDto } from 'src/lists/definitions/list.dto';
import { ListDocument } from 'src/lists/definitions/list.schema';
import { BookUserListItemDocument } from 'src/userListItems/books/definitions/bookUserListItem.schema';
import { BULIDto } from 'src/userListItems/books/definitions/buli.dto';
import { UserListDocument } from './userList.schema';
export declare class UserListDto {
    id: Types.ObjectId;
    list: StringIdType | ListDocument | ListDto;
    userId: string;
    notes: string;
    userListItems: Types.ObjectId[] | BookUserListItemDocument[] | BULIDto[];
    createdAt: Date;
    updatedAt: Date;
    constructor(id: Types.ObjectId, list: StringIdType | ListDocument | ListDto, userId: string, notes: string, userListItems: Types.ObjectId[] | BookUserListItemDocument[] | BULIDto[], createdAt: Date, updatedAt: Date);
    static assign(doc: UserListDocument): UserListDto;
    static assignWithPopulatedDocuments(doc: UserListDocument): UserListDto;
    static assignWithPopulatedListOnly(doc: UserListDocument): UserListDto;
}
export declare class CreateUserListDto {
    list: StringIdType;
    userId: string;
    notes: string;
    constructor(list: StringIdType, userId: string, notes: string);
}
export declare class PatchUserListDto {
    notes?: string;
    constructor({ notes }: {
        notes?: any;
    });
}
