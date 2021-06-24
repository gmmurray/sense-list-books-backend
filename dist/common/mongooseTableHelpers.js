"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserListItemModelName = exports.getUserListModelName = exports.getListItemModelName = exports.getListModelName = exports.getUserProfileListCountPropName = exports.getPrivateFieldsEntityName = exports.getPrivateFieldsPropName = exports.getSingleUserListItemPropName = exports.getMultiUserListItemPropName = exports.getSingleUserListPropName = exports.getMultiUserListPropName = exports.getSingleListItemPropName = exports.getMultiListItemPropName = exports.getSingleListPropName = exports.getMultiListPropName = exports.userProfileListCountCollectionName = exports.userProfilePrivateFieldsPropName = exports.userProfileCollectionName = exports.bookUserListItemEntityName = exports.bookUserListItemCollectionName = exports.userListEntityName = exports.userListCollectionName = exports.bookListItemEntityName = exports.bookListItemCollectionName = exports.listEntityName = exports.listCollectionName = void 0;
const common_1 = require("@nestjs/common");
const bookListItem_schema_1 = require("../listItems/books/definitions/bookListItem.schema");
const list_schema_1 = require("../lists/definitions/list.schema");
const bookUserListItem_schema_1 = require("../userListItems/books/definitions/bookUserListItem.schema");
const userList_schema_1 = require("../userLists/definitions/userList.schema");
const privateUserFields_schema_1 = require("../users/definitions/userProfiles/privateUserFields.schema");
const listType_1 = require("./types/listType");
exports.listCollectionName = 'lists';
exports.listEntityName = 'list';
exports.bookListItemCollectionName = 'bookListItems';
exports.bookListItemEntityName = 'bookListItem';
exports.userListCollectionName = 'userLists';
exports.userListEntityName = 'userList';
exports.bookUserListItemCollectionName = 'bookUserListItems';
exports.bookUserListItemEntityName = 'bookUserListItem';
exports.userProfileCollectionName = 'userProfiles';
exports.userProfilePrivateFieldsPropName = 'privateFields';
exports.userProfileListCountCollectionName = 'listCount';
const getMultiListPropName = () => exports.listCollectionName;
exports.getMultiListPropName = getMultiListPropName;
const getSingleListPropName = () => exports.listEntityName;
exports.getSingleListPropName = getSingleListPropName;
const getMultiListItemPropName = (type) => {
    switch (type) {
        case listType_1.ListType.Book:
            return exports.bookListItemCollectionName;
        default:
            throw new common_1.NotImplementedException();
    }
};
exports.getMultiListItemPropName = getMultiListItemPropName;
const getSingleListItemPropName = (type) => {
    switch (type) {
        case listType_1.ListType.Book:
            return exports.bookListItemEntityName;
        default:
            throw new common_1.NotImplementedException();
    }
};
exports.getSingleListItemPropName = getSingleListItemPropName;
const getMultiUserListPropName = () => exports.userListCollectionName;
exports.getMultiUserListPropName = getMultiUserListPropName;
const getSingleUserListPropName = () => exports.userListEntityName;
exports.getSingleUserListPropName = getSingleUserListPropName;
const getMultiUserListItemPropName = (type) => {
    switch (type) {
        case listType_1.ListType.Book:
            return exports.bookUserListItemCollectionName;
        default:
            throw new common_1.NotImplementedException();
    }
};
exports.getMultiUserListItemPropName = getMultiUserListItemPropName;
const getSingleUserListItemPropName = (type) => {
    switch (type) {
        case listType_1.ListType.Book:
            return exports.bookUserListItemEntityName;
        default:
            throw new common_1.NotImplementedException();
    }
};
exports.getSingleUserListItemPropName = getSingleUserListItemPropName;
const getPrivateFieldsPropName = () => exports.userProfilePrivateFieldsPropName;
exports.getPrivateFieldsPropName = getPrivateFieldsPropName;
const getPrivateFieldsEntityName = () => privateUserFields_schema_1.PrivateUserFields.name;
exports.getPrivateFieldsEntityName = getPrivateFieldsEntityName;
const getUserProfileListCountPropName = () => exports.userProfileListCountCollectionName;
exports.getUserProfileListCountPropName = getUserProfileListCountPropName;
const getListModelName = () => list_schema_1.List.name;
exports.getListModelName = getListModelName;
const getListItemModelName = (type) => {
    switch (type) {
        case listType_1.ListType.Book:
            return bookListItem_schema_1.BookListItem.name;
        default:
            throw new common_1.NotImplementedException();
    }
};
exports.getListItemModelName = getListItemModelName;
const getUserListModelName = () => userList_schema_1.UserList.name;
exports.getUserListModelName = getUserListModelName;
const getUserListItemModelName = (type) => {
    switch (type) {
        case listType_1.ListType.Book:
            return bookUserListItem_schema_1.BookUserListItem.name;
        default:
            throw new common_1.NotImplementedException();
    }
};
exports.getUserListItemModelName = getUserListItemModelName;
//# sourceMappingURL=mongooseTableHelpers.js.map