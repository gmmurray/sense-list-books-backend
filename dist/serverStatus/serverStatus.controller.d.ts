import { ServerStatus } from './definitions/serverStatus';
import { ServerStatusService } from './serverStatus.service';
export declare class ServerStatusController {
    private readonly serverStatusService;
    constructor(serverStatusService: ServerStatusService);
    getServerStatus(): Promise<ServerStatus>;
}
