"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookUserListItemSchema = exports.BookUserListItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const userListItemStatus_1 = require("../../../common/types/userListItemStatus");
const bookListItem_schema_1 = require("../../../listItems/books/definitions/bookListItem.schema");
const userListItem_schema_1 = require("../../definitions/userListItem.schema");
let BookUserListItem = class BookUserListItem extends userListItem_schema_1.UserListItem {
};
__decorate([
    mongoose_1.Prop({ ref: 'BookListItem', type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", Object)
], BookUserListItem.prototype, "bookListItem", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], BookUserListItem.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Boolean)
], BookUserListItem.prototype, "owned", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", Number)
], BookUserListItem.prototype, "rating", void 0);
BookUserListItem = __decorate([
    mongoose_1.Schema({ timestamps: true })
], BookUserListItem);
exports.BookUserListItem = BookUserListItem;
exports.BookUserListItemSchema = mongoose_1.SchemaFactory.createForClass(BookUserListItem);
//# sourceMappingURL=bookUserListItem.schema.js.map