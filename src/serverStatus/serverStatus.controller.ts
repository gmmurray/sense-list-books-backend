import { Controller, Get } from '@nestjs/common';
import { ServerStatus } from './definitions/serverStatus';
import { ServerStatusService } from './serverStatus.service';

@Controller('server-status')
export class ServerStatusController {
  constructor(private readonly serverStatusService: ServerStatusService) {}

  @Get()
  async getServerStatus(): Promise<ServerStatus> {
    return await this.serverStatusService.getServerStatus();
  }
}
