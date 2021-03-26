import { Types } from 'mongoose';
import { StringIdType } from 'src/common/types/stringIdType';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { UserListDocument } from 'src/userLists/definitions/userList.schema';
export declare class UserListItemDto {
    id: StringIdType;
    userList: Types.ObjectId | UserListDocument | UserListDto;
    userId: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
