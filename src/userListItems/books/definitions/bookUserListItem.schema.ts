import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BookFormatType } from 'src/common/types/bookFormatType';

import { BookReadingStatus } from 'src/common/types/userListItemStatus';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';
import { UserListItem } from '../../definitions/userListItem.schema';

export type BookUserListItemDocument = BookUserListItem &
  UserListItem &
  Document;

@Schema({ timestamps: true })
export class BookUserListItem extends UserListItem {
  @Prop({ ref: 'BookListItem', type: Types.ObjectId })
  bookListItem: BookListItemDocument | Types.ObjectId;

  @Prop({ required: true })
  status: BookReadingStatus;

  @Prop({ required: true })
  owned: boolean;

  @Prop({ default: null })
  rating: number | null;

  @Prop({ default: BookFormatType.Physical })
  format: BookFormatType;
}

export const BookUserListItemSchema = SchemaFactory.createForClass(
  BookUserListItem,
);
