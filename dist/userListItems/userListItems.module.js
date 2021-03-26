"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListItemsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const userLists_module_1 = require("../userLists/userLists.module");
const allUserListItems_service_1 = require("./allUserListItems.service");
const buli_controller_1 = require("./books/buli.controller");
const buli_service_1 = require("./books/buli.service");
const bookUserListItem_schema_1 = require("./books/definitions/bookUserListItem.schema");
let UserListItemsModule = class UserListItemsModule {
};
UserListItemsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: bookUserListItem_schema_1.BookUserListItem.name, schema: bookUserListItem_schema_1.BookUserListItemSchema },
            ]),
            common_1.forwardRef(() => userLists_module_1.UserListsModule),
        ],
        controllers: [buli_controller_1.BULIController],
        providers: [buli_service_1.BULIService, allUserListItems_service_1.AllUserListItemsService],
        exports: [allUserListItems_service_1.AllUserListItemsService, buli_service_1.BULIService],
    })
], UserListItemsModule);
exports.UserListItemsModule = UserListItemsModule;
//# sourceMappingURL=userListItems.module.js.map