import { Types } from 'mongoose';
import { ListDocument } from 'src/lists/definitions/list.schema';
import { ListType } from 'src/common/types/listType';
export declare class ListItemDomain {
    listType: ListType;
    list: Types.ObjectId | ListDocument;
    ordinal: number;
}
