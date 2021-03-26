"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const lists_module_1 = require("../lists/lists.module");
const bookListItem_schema_1 = require("./books/definitions/bookListItem.schema");
const bookListItem_service_1 = require("./books/bookListItem.service");
const bookListItems_controller_1 = require("./books/bookListItems.controller");
const openLibrary_module_1 = require("../openLibrary/openLibrary.module");
const allListItems_service_1 = require("./allListItems.service");
const userListItems_module_1 = require("../userListItems/userListItems.module");
const googleBooks_module_1 = require("../googleBooks/googleBooks.module");
let ListItemsModule = class ListItemsModule {
};
ListItemsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: bookListItem_schema_1.BookListItem.name, schema: bookListItem_schema_1.BookListItemSchema },
            ]),
            common_1.forwardRef(() => lists_module_1.ListsModule),
            googleBooks_module_1.GoogleBooksModule,
            openLibrary_module_1.OpenLibraryModule,
            userListItems_module_1.UserListItemsModule,
        ],
        controllers: [bookListItems_controller_1.BookListItemsController],
        providers: [bookListItem_service_1.BookListItemsService, allListItems_service_1.AllListItemsService],
        exports: [allListItems_service_1.AllListItemsService],
    })
], ListItemsModule);
exports.ListItemsModule = ListItemsModule;
//# sourceMappingURL=listItems.module.js.map