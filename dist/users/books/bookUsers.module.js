"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookUsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const authz_module_1 = require("../../authz/authz.module");
const lists_module_1 = require("../../lists/lists.module");
const userListItems_module_1 = require("../../userListItems/userListItems.module");
const userLists_module_1 = require("../../userLists/userLists.module");
const userProfile_schema_1 = require("../definitions/userProfiles/userProfile.schema");
const bookUsers_controller_1 = require("./bookUsers.controller");
const bookUsers_service_1 = require("./bookUsers.service");
let BookUsersModule = class BookUsersModule {
};
BookUsersModule = __decorate([
    common_1.Module({
        imports: [
            userLists_module_1.UserListsModule,
            userListItems_module_1.UserListItemsModule,
            lists_module_1.ListsModule,
            authz_module_1.AuthzModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: userProfile_schema_1.UserProfile.name,
                    schema: userProfile_schema_1.UserProfileSchema,
                },
            ]),
        ],
        controllers: [bookUsers_controller_1.BookUsersController],
        providers: [bookUsers_service_1.BookUsersService],
    })
], BookUsersModule);
exports.BookUsersModule = BookUsersModule;
//# sourceMappingURL=bookUsers.module.js.map