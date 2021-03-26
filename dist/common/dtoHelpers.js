"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDtoFields = void 0;
function cleanDtoFields(reference, additionalExpression) {
    return Object.assign({}, Object.keys(reference)
        .filter((key) => reference[key] !== undefined &&
        (additionalExpression ? additionalExpression(key) : true))
        .reduce((obj, key) => {
        obj[key] = reference[key];
        return obj;
    }, {}));
}
exports.cleanDtoFields = cleanDtoFields;
//# sourceMappingURL=dtoHelpers.js.map