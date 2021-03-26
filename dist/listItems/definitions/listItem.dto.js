"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateListItemOrdinalsDto = exports.ListItemDto = void 0;
const list_schema_1 = require("../../lists/definitions/list.schema");
const listType_1 = require("../../common/types/listType");
const list_dto_1 = require("../../lists/definitions/list.dto");
const stringIdType_1 = require("../../common/types/stringIdType");
class ListItemDto {
}
exports.ListItemDto = ListItemDto;
class UpdateListItemOrdinalsDto {
    constructor(listId, ordinalUpdates) {
        this.listId = listId;
        this.ordinalUpdates = ordinalUpdates;
    }
}
exports.UpdateListItemOrdinalsDto = UpdateListItemOrdinalsDto;
//# sourceMappingURL=listItem.dto.js.map