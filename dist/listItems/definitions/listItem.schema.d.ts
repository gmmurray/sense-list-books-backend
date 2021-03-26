import { Document, Types } from 'mongoose';
import { ListType } from 'src/common/types/listType';
import { ListDocument } from 'src/lists/definitions/list.schema';
export declare type ListItemDocument = ListItem & Document;
export declare class ListItem {
    list: ListDocument | Types.ObjectId;
    ordinal: number;
    listType: ListType;
    createdAt: Date;
    updatedAt: Date;
}
