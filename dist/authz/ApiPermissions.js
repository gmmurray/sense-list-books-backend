"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissions = exports.GoogleBooksApiPermissions = exports.OpenLibraryApiPermissions = exports.UserListItemApiPermissions = exports.UserListApiPermissions = exports.ListItemApiPermissions = exports.ListApiPermissions = void 0;
var ListApiPermissions;
(function (ListApiPermissions) {
    ListApiPermissions["read"] = "read:lists";
    ListApiPermissions["write"] = "write:lists";
    ListApiPermissions["delete"] = "delete:lists";
})(ListApiPermissions = exports.ListApiPermissions || (exports.ListApiPermissions = {}));
var ListItemApiPermissions;
(function (ListItemApiPermissions) {
    ListItemApiPermissions["read"] = "read:list-items";
    ListItemApiPermissions["write"] = "write:list-items";
    ListItemApiPermissions["delete"] = "delete:list-items";
})(ListItemApiPermissions = exports.ListItemApiPermissions || (exports.ListItemApiPermissions = {}));
var UserListApiPermissions;
(function (UserListApiPermissions) {
    UserListApiPermissions["read"] = "read:user-lists";
    UserListApiPermissions["write"] = "write:user-lists";
    UserListApiPermissions["delete"] = "delete:user-lists";
})(UserListApiPermissions = exports.UserListApiPermissions || (exports.UserListApiPermissions = {}));
var UserListItemApiPermissions;
(function (UserListItemApiPermissions) {
    UserListItemApiPermissions["read"] = "read:user-list-items";
    UserListItemApiPermissions["write"] = "write:user-list-items";
    UserListItemApiPermissions["delete"] = "delete:user-list-items";
})(UserListItemApiPermissions = exports.UserListItemApiPermissions || (exports.UserListItemApiPermissions = {}));
var OpenLibraryApiPermissions;
(function (OpenLibraryApiPermissions) {
    OpenLibraryApiPermissions["read"] = "read:books-api";
})(OpenLibraryApiPermissions = exports.OpenLibraryApiPermissions || (exports.OpenLibraryApiPermissions = {}));
var GoogleBooksApiPermissions;
(function (GoogleBooksApiPermissions) {
    GoogleBooksApiPermissions["read"] = "read:google-books";
})(GoogleBooksApiPermissions = exports.GoogleBooksApiPermissions || (exports.GoogleBooksApiPermissions = {}));
var UserPermissions;
(function (UserPermissions) {
    UserPermissions["read"] = "read:users";
    UserPermissions["write"] = "write:users";
    UserPermissions["delete"] = "delete:users";
})(UserPermissions = exports.UserPermissions || (exports.UserPermissions = {}));
//# sourceMappingURL=ApiPermissions.js.map