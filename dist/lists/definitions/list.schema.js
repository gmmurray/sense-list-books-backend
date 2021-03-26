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
exports.ListSchema = exports.List = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const listType_1 = require("../../common/types/listType");
const bookListItem_schema_1 = require("../../listItems/books/definitions/bookListItem.schema");
let List = class List {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Boolean)
], List.prototype, "isPublic", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], List.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ default: '' }),
    __metadata("design:type", String)
], List.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({
        required: true,
        enum: Object.keys(listType_1.ListType).map(key => listType_1.ListType[key]),
    }),
    __metadata("design:type", Number)
], List.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], List.prototype, "category", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], List.prototype, "ownerId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], List.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], List.prototype, "updatedAt", void 0);
__decorate([
    mongoose_1.Prop({ ref: 'bookListItems', type: [mongoose_2.Types.ObjectId] }),
    __metadata("design:type", Array)
], List.prototype, "bookListItems", void 0);
List = __decorate([
    mongoose_1.Schema({ timestamps: true })
], List);
exports.List = List;
exports.ListSchema = mongoose_1.SchemaFactory.createForClass(List);
//# sourceMappingURL=list.schema.js.map