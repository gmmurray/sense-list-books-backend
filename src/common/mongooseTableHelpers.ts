import { NotImplementedException } from '@nestjs/common';
import { BookListItem } from 'src/listItems/books/definitions/bookListItem.schema';
import { List } from 'src/lists/definitions/list.schema';
import { BookUserListItem } from 'src/userListItems/books/definitions/bookUserListItem.schema';
import { UserList } from 'src/userLists/definitions/userList.schema';
import { PrivateUserFields } from 'src/users/definitions/userProfiles/privateUserFields.schema';
import { ListType } from './types/listType';

//#region collection and entity names
export const listCollectionName = 'lists';
export const listEntityName = 'list';
export const bookListItemCollectionName = 'bookListItems';
export const bookListItemEntityName = 'bookListItem';
export const userListCollectionName = 'userLists';
export const userListEntityName = 'userList';
export const bookUserListItemCollectionName = 'bookUserListItems';
export const bookUserListItemEntityName = 'bookUserListItem';
export const userProfileCollectionName = 'userProfiles';
export const userProfilePrivateFieldsPropName = 'privateFields';
export const userProfileListCountCollectionName = 'listCount';
//#endregion

//#region names for use as properties
export const getMultiListPropName = (): string => listCollectionName;
export const getSingleListPropName = (): string => listEntityName;

export const getMultiListItemPropName = (type: ListType): string => {
  switch (type) {
    case ListType.Book:
      return bookListItemCollectionName;
    default:
      throw new NotImplementedException();
  }
};
export const getSingleListItemPropName = (type: ListType): string => {
  switch (type) {
    case ListType.Book:
      return bookListItemEntityName;
    default:
      throw new NotImplementedException();
  }
};

export const getMultiUserListPropName = (): string => userListCollectionName;
export const getSingleUserListPropName = (): string => userListEntityName;

export const getMultiUserListItemPropName = (type: ListType): string => {
  switch (type) {
    case ListType.Book:
      return bookUserListItemCollectionName;
    default:
      throw new NotImplementedException();
  }
};
export const getSingleUserListItemPropName = (type: ListType): string => {
  switch (type) {
    case ListType.Book:
      return bookUserListItemEntityName;
    default:
      throw new NotImplementedException();
  }
};

export const getPrivateFieldsPropName = (): string =>
  userProfilePrivateFieldsPropName;
export const getPrivateFieldsEntityName = (): string => PrivateUserFields.name;
export const getUserProfileListCountPropName = (): string =>
  userProfileListCountCollectionName;
//#endregion

//#region model names
export const getListModelName = (): string => List.name;
export const getListItemModelName = (type: ListType): string => {
  switch (type) {
    case ListType.Book:
      return BookListItem.name;
    default:
      throw new NotImplementedException();
  }
};
export const getUserListModelName = (): string => UserList.name;
export const getUserListItemModelName = (type: ListType): string => {
  switch (type) {
    case ListType.Book:
      return BookUserListItem.name;
    default:
      throw new NotImplementedException();
  }
};
//#endregion
