import { Document, Types } from 'mongoose';
import { BookListItemDto } from 'src/listItems/books/definitions/bookListItem.dto';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';

import { ListType } from '../../common/types/listType';
import { ListDocument } from './list.schema';

export class ListDto {
  constructor(
    public id: Types.ObjectId,
    public isPublic: boolean,
    public title: string,
    public description: string,
    public type: ListType,
    public category: string,
    public ownerId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public bookListItems:
      | Types.ObjectId[]
      | BookListItemDocument[]
      | BookListItemDto[],
  ) {}

  static assign(doc: ListDocument): ListDto {
    let subBookListItems: BookListItemDto[] | undefined;
    if (
      doc.bookListItems &&
      doc.bookListItems.length &&
      (doc.bookListItems as Array<any>).every(item => item instanceof Document)
    ) {
      subBookListItems = (doc.bookListItems as BookListItemDocument[]).map(
        item => BookListItemDto.assign(item),
      );
    }
    return new ListDto(
      doc._id,
      doc.isPublic,
      doc.title,
      doc.description,
      doc.type,
      doc.category,
      doc.ownerId,
      doc.createdAt,
      doc.updatedAt,
      subBookListItems || doc.bookListItems,
    );
  }
}

export class QueryListDto {
  public title?: string;
  public description?: string;
  public category?: string;
  public type?: ListType;
  public ownerOnly?: boolean | string;
  public ownerId?: string;
  constructor({
    title = undefined,
    description = undefined,
    category = undefined,
    type = undefined,
    ownerOnly = undefined,
    ownerId = undefined,
  }) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.type = type;
    this.ownerOnly = ownerOnly;
    this.ownerId = ownerId;
  }
}

export class CreateListDto {
  constructor(
    public isPublic: boolean,
    public title: string,
    public description: string,
    public type: ListType,
    public category: string,
  ) {}
}

export class PatchListDto {
  public isPublic?: boolean;
  public title?: string;
  public description?: string;
  public category?: string;
  constructor({
    isPublic = undefined,
    title = undefined,
    description = undefined,
    category = undefined,
  }) {
    this.isPublic = isPublic;
    this.title = title;
    this.description = description;
    this.category = category;
  }
}
