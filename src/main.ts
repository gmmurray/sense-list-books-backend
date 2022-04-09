import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { createOriginUrls } from './common/urlHelper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origin =
    process.env.NODE_ENV === 'development'
      ? process.env.FRONTEND_URL
      : createOriginUrls(process.env.FRONTEND_URL);

  app.enableCors({
    origin,
  });
  app.use(helmet());

  await app.listen(process.env.PORT || 7000);
}
bootstrap();
