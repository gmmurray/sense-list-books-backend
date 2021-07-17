"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStatusModule = void 0;
const common_1 = require("@nestjs/common");
const serverStatus_controller_1 = require("./serverStatus.controller");
const serverStatus_service_1 = require("./serverStatus.service");
let ServerStatusModule = class ServerStatusModule {
};
ServerStatusModule = __decorate([
    common_1.Module({
        controllers: [serverStatus_controller_1.ServerStatusController],
        providers: [serverStatus_service_1.ServerStatusService],
    })
], ServerStatusModule);
exports.ServerStatusModule = ServerStatusModule;
//# sourceMappingURL=serverStatus.module.js.map