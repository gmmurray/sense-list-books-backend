import { Types } from 'mongoose';
import { BookListItemDto } from 'src/listItems/books/definitions/bookListItem.dto';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';
import { ListType } from '../../common/types/listType';
import { ListDocument } from './list.schema';
export declare class ListDto {
    id: Types.ObjectId;
    isPublic: boolean;
    title: string;
    description: string;
    type: ListType;
    category: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    bookListItems: Types.ObjectId[] | BookListItemDocument[] | BookListItemDto[];
    constructor(id: Types.ObjectId, isPublic: boolean, title: string, description: string, type: ListType, category: string, ownerId: string, createdAt: Date, updatedAt: Date, bookListItems: Types.ObjectId[] | BookListItemDocument[] | BookListItemDto[]);
    static assign(doc: ListDocument): ListDto;
}
export declare class QueryListDto {
    title?: string;
    description?: string;
    category?: string;
    type?: ListType;
    ownerOnly?: boolean | string;
    constructor({ title, description, category, type, ownerOnly, }: {
        title?: any;
        description?: any;
        category?: any;
        type?: any;
        ownerOnly?: any;
    });
}
export declare class CreateListDto {
    isPublic: boolean;
    title: string;
    description: string;
    type: ListType;
    category: string;
    constructor(isPublic: boolean, title: string, description: string, type: ListType, category: string);
}
export declare class PatchListDto {
    isPublic?: boolean;
    title?: string;
    description?: string;
    category?: string;
    constructor({ isPublic, title, description, category, }: {
        isPublic?: any;
        title?: any;
        description?: any;
        category?: any;
    });
}
