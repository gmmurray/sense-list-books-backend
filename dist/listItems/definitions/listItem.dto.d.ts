import { Types } from 'mongoose';
import { ListDocument } from 'src/lists/definitions/list.schema';
import { ListType } from 'src/common/types/listType';
import { ListDto } from 'src/lists/definitions/list.dto';
import { StringIdType } from 'src/common/types/stringIdType';
export declare class ListItemDto {
    id: Types.ObjectId;
    list: Types.ObjectId | ListDocument | ListDto;
    ordinal: number;
    listType: ListType;
    createdAt: Date;
    updatedAt: Date;
}
export interface ListItemOrdinalUpdate {
    listItemId: StringIdType;
    ordinal: number;
}
export declare class UpdateListItemOrdinalsDto {
    listId: string;
    ordinalUpdates: ListItemOrdinalUpdate[];
    constructor(listId: string, ordinalUpdates: ListItemOrdinalUpdate[]);
}
