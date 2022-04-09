"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helmet = require("helmet");
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const urlHelper_1 = require("./common/urlHelper");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const origin = process.env.NODE_ENV === 'development'
        ? process.env.FRONTEND_URL
        : urlHelper_1.createOriginUrls(process.env.FRONTEND_URL);
    app.enableCors({
        origin,
    });
    app.use(helmet());
    await app.listen(process.env.PORT || 7000);
}
bootstrap();
//# sourceMappingURL=main.js.map