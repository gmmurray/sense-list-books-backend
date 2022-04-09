"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOriginUrls = void 0;
const createOriginUrls = (url) => {
    const result = [];
    if (url.includes('www')) {
        result.push(url, url.replace('www', ''));
    }
    else {
        const splitIndex = url.lastIndexOf('/') + 1;
        result.push(url);
        result.push(url.substring(0, splitIndex) +
            'www.' +
            url.substring(splitIndex, url.length));
    }
    return result;
};
exports.createOriginUrls = createOriginUrls;
//# sourceMappingURL=urlHelper.js.map