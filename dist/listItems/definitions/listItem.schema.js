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
exports.ListItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const listType_1 = require("../../common/types/listType");
const list_schema_1 = require("../../lists/definitions/list.schema");
let ListItem = class ListItem {
};
__decorate([
    mongoose_1.Prop({ ref: 'List', type: mongoose_2.Types.ObjectId }),
    __metadata("design:type", Object)
], ListItem.prototype, "list", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], ListItem.prototype, "ordinal", void 0);
__decorate([
    mongoose_1.Prop({ required: true, immutable: true }),
    __metadata("design:type", Number)
], ListItem.prototype, "listType", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], ListItem.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], ListItem.prototype, "updatedAt", void 0);
ListItem = __decorate([
    mongoose_1.Schema({ timestamps: true })
], ListItem);
exports.ListItem = ListItem;
//# sourceMappingURL=listItem.schema.js.map