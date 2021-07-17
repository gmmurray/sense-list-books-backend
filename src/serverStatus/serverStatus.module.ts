import { Module } from '@nestjs/common';
import { ServerStatusController } from './serverStatus.controller';
import { ServerStatusService } from './serverStatus.service';

@Module({
  controllers: [ServerStatusController],
  providers: [ServerStatusService],
})
export class ServerStatusModule {}
