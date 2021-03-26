import { Types } from 'mongoose';
import { ListItemDto } from 'src/listItems/definitions/listItem.dto';
import { BookListItemDocument } from './bookListItem.schema';
import { BookListItemMeta } from './bookListItem';
import { ListType } from 'src/common/types/listType';
export declare class BookListItemDto extends ListItemDto {
    isbn: string;
    volumeId: string;
    meta: BookListItemMeta;
    constructor(isbn: string, volumeId: string, meta: BookListItemMeta, baseProperties: ListItemDto);
    static assign(doc: BookListItemDocument): BookListItemDto;
}
export declare class QueryBookListItemDto {
    list?: string;
    ordinal?: number;
    listType?: ListType;
    title?: string;
    description?: string;
    author?: string;
    constructor({ ordinal, listType, title, description, author, }: {
        ordinal?: any;
        listType?: any;
        title?: any;
        description?: any;
        author?: any;
    });
}
export declare class CreateBookListItemDto {
    list: Types.ObjectId;
    volumeId: string;
    ordinal: number;
    constructor(list: Types.ObjectId, volumeId: string, ordinal: number);
}
export declare class PatchBookListItemDto {
    ordinal?: number;
    constructor({ ordinal }: {
        ordinal?: any;
    });
}
