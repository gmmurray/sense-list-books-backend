"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBooksModule = void 0;
const common_1 = require("@nestjs/common");
const googleBooks_controller_1 = require("./googleBooks.controller");
const googlebooks_service_1 = require("./googlebooks.service");
let GoogleBooksModule = class GoogleBooksModule {
};
GoogleBooksModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [googleBooks_controller_1.GoogleBooksController],
        providers: [googlebooks_service_1.GoogleBooksService],
        exports: [googlebooks_service_1.GoogleBooksService],
    })
], GoogleBooksModule);
exports.GoogleBooksModule = GoogleBooksModule;
//# sourceMappingURL=googleBooks.module.js.map