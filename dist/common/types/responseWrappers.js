"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTotalResponse = void 0;
class DataTotalResponse {
    constructor(data, total) {
        this.data = data;
        this.total = total ? total : data.length;
    }
}
exports.DataTotalResponse = DataTotalResponse;
//# sourceMappingURL=responseWrappers.js.map