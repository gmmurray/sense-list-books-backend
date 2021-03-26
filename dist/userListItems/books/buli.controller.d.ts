import { AuthRequest } from 'src/authz/authzUser';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { BULIService } from './buli.service';
import { BULIDto, CreateBULIDto, PatchBULIDto } from './definitions/buli.dto';
export declare class BULIController {
    private readonly buliService;
    constructor(buliService: BULIService);
    index({ user }: AuthRequest, query: {
        userListId: string;
    }): Promise<DataTotalResponse<BULIDto>>;
    getById({ user }: AuthRequest, buliId: string): Promise<BULIDto>;
    create({ user }: AuthRequest, createDto: CreateBULIDto): Promise<BULIDto>;
    patch({ user }: AuthRequest, buliId: string, updates: PatchBULIDto): Promise<void>;
    delete({ user }: AuthRequest, buliId: string): Promise<void>;
}
