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
exports.BookListItemSchema = exports.BookListItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const listItem_schema_1 = require("../../definitions/listItem.schema");
const bookListItem_1 = require("./bookListItem");
let BookListItem = class BookListItem extends listItem_schema_1.ListItem {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], BookListItem.prototype, "isbn", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], BookListItem.prototype, "volumeId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", bookListItem_1.BookListItemMeta)
], BookListItem.prototype, "meta", void 0);
BookListItem = __decorate([
    mongoose_1.Schema()
], BookListItem);
exports.BookListItem = BookListItem;
exports.BookListItemSchema = mongoose_1.SchemaFactory.createForClass(BookListItem);
//# sourceMappingURL=bookListItem.schema.js.map