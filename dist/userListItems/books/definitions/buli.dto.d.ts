import { Types } from 'mongoose';
import { BookFormatType } from 'src/common/types/bookFormatType';
import { StringIdType } from 'src/common/types/stringIdType';
import { BookReadingStatus } from 'src/common/types/userListItemStatus';
import { BookListItemDto } from 'src/listItems/books/definitions/bookListItem.dto';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';
import { UserListItemDto } from 'src/userListItems/definitions/userListItem.dto';
import { BookUserListItemDocument } from './bookUserListItem.schema';
export declare class BULIDto extends UserListItemDto {
    bookListItem: Types.ObjectId | BookListItemDocument | BookListItemDto;
    status: BookReadingStatus;
    owned: boolean;
    format?: BookFormatType | null;
    rating?: number | null;
    constructor(bookListItem: Types.ObjectId | BookListItemDocument | BookListItemDto, status: BookReadingStatus, owned: boolean, baseProperties: UserListItemDto, format?: BookFormatType | null, rating?: number | null);
    static assign(doc: BookUserListItemDocument): BULIDto;
    static assignWithPopulatedDocuments(doc: BookUserListItemDocument): BULIDto;
    static assignWithPopulatedListItemsOnly(doc: BookUserListItemDocument): BULIDto;
}
export declare class CreateBULIDto {
    userList: StringIdType;
    userId: string;
    bookListItem: StringIdType;
    status: BookReadingStatus;
    owned: boolean;
    rating?: number | null;
    notes?: string;
    format?: BookFormatType | null;
    constructor(userList: StringIdType, userId: string, bookListItem: StringIdType, status: BookReadingStatus, owned: boolean, rating?: number | null, notes?: string, format?: BookFormatType | null);
}
export declare class PatchBULIDto {
    notes: string;
    status: BookReadingStatus;
    owned: boolean;
    rating: number | null;
    format: BookFormatType | null;
    constructor({ notes, status, owned, rating, format, }: {
        notes?: any;
        status?: any;
        owned?: any;
        rating?: any;
        format?: any;
    });
}
