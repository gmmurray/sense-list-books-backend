"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const listItems_module_1 = require("../listItems/listItems.module");
const lists_module_1 = require("../lists/lists.module");
const userListItems_module_1 = require("../userListItems/userListItems.module");
const userList_schema_1 = require("./definitions/userList.schema");
const userLists_controller_1 = require("./userLists.controller");
const userLists_service_1 = require("./userLists.service");
let UserListsModule = class UserListsModule {
};
UserListsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: userList_schema_1.UserList.name, schema: userList_schema_1.UserListSchema },
            ]),
            common_1.forwardRef(() => lists_module_1.ListsModule),
            common_1.forwardRef(() => listItems_module_1.ListItemsModule),
            common_1.forwardRef(() => userListItems_module_1.UserListItemsModule),
        ],
        controllers: [userLists_controller_1.UserListsController],
        providers: [userLists_service_1.UserListsService],
        exports: [userLists_service_1.UserListsService],
    })
], UserListsModule);
exports.UserListsModule = UserListsModule;
//# sourceMappingURL=userLists.module.js.map