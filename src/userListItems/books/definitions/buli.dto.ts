import { Document, Types } from 'mongoose';
import { BookFormatType } from 'src/common/types/bookFormatType';
import { StringIdType } from 'src/common/types/stringIdType';
import { BookReadingStatus } from 'src/common/types/userListItemStatus';
import { BookListItemDto } from 'src/listItems/books/definitions/bookListItem.dto';
import { BookListItemDocument } from 'src/listItems/books/definitions/bookListItem.schema';
import { UserListItemDto } from 'src/userListItems/definitions/userListItem.dto';
import { UserListDto } from 'src/userLists/definitions/userList.dto';
import { UserListDocument } from 'src/userLists/definitions/userList.schema';
import { BookUserListItemDocument } from './bookUserListItem.schema';

export class BULIDto extends UserListItemDto {
  constructor(
    public bookListItem:
      | Types.ObjectId
      | BookListItemDocument
      | BookListItemDto,
    public status: BookReadingStatus,
    public owned: boolean,
    baseProperties: UserListItemDto,
    public format?: BookFormatType,
    public rating?: number | null,
  ) {
    super();
    this.id = baseProperties.id;
    this.userList = baseProperties.userList;
    this.userId = baseProperties.userId;
    this.notes = baseProperties.notes;
    this.createdAt = baseProperties.createdAt;
    this.updatedAt = baseProperties.updatedAt;
  }

  static assign(doc: BookUserListItemDocument): BULIDto {
    let subBookListItem: BookListItemDto | undefined;
    if (doc.bookListItem && doc.bookListItem instanceof Document) {
      subBookListItem = BookListItemDto.assign(doc.bookListItem);
    }
    let subUserList: UserListDto | undefined;
    if (doc.userList && doc.userList instanceof Document) {
      subUserList = UserListDto.assign(doc.userList);
    }
    return new BULIDto(
      subBookListItem || doc.bookListItem,
      doc.status,
      doc.owned,
      {
        id: doc._id,
        userList: subUserList || doc.userList,
        userId: doc.userId,
        notes: doc.notes,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.owned ? doc.format : null,
      doc.rating,
    );
  }
  static assignWithPopulatedDocuments(doc: BookUserListItemDocument): BULIDto {
    return new BULIDto(
      BookListItemDto.assign(<BookListItemDocument>doc.bookListItem),
      doc.status,
      doc.owned,
      {
        id: doc._id,
        userList: UserListDto.assign(<UserListDocument>doc.userList),
        userId: doc.userId,
        notes: doc.notes,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.owned ? doc.format : null,
      doc.rating,
    );
  }
  static assignWithPopulatedListItemsOnly(
    doc: BookUserListItemDocument,
  ): BULIDto {
    let subUserList: UserListDto | undefined;
    if (doc.userList && doc.userList instanceof Document) {
      subUserList = UserListDto.assign(doc.userList);
    }
    return new BULIDto(
      BookListItemDto.assign(<BookListItemDocument>doc.bookListItem),
      doc.status,
      doc.owned,
      {
        id: doc._id,
        userList: subUserList || doc.userList,
        userId: doc.userId,
        notes: doc.notes,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
      doc.owned ? doc.format : null,
      doc.rating,
    );
  }
}

export class CreateBULIDto {
  constructor(
    public userList: StringIdType,
    public userId: string,
    public bookListItem: StringIdType,
    public status: BookReadingStatus,
    public owned: boolean,
    public rating?: number | null,
    public notes?: string,
    public format?: BookFormatType,
  ) {}
}

export class PatchBULIDto {
  public notes: string;
  public status: BookReadingStatus;
  public owned: boolean;
  public rating: number | null;
  public format: BookFormatType;
  constructor({
    notes = undefined,
    status = undefined,
    owned = undefined,
    rating = undefined,
    format = undefined,
  }) {
    this.notes = notes;
    this.status = status;
    this.owned = owned;
    this.rating = rating;
    this.format = format;
  }
}
