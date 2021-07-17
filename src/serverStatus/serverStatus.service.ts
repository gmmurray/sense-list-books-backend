import { Injectable } from '@nestjs/common';
import { ServerStatus } from './definitions/serverStatus';

@Injectable()
export class ServerStatusService {
  async getServerStatus(): Promise<ServerStatus> {
    const result = new ServerStatus(true);
    return result;
  }
}
