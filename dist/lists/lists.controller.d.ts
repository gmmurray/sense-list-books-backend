import { AuthRequest } from 'src/authz/authzUser';
import { CreateListDto, ListDto, PatchListDto, QueryListDto } from './definitions/list.dto';
import { ListsService } from './lists.service';
export declare class ListsController {
    private readonly listsService;
    constructor(listsService: ListsService);
    index({ user }: AuthRequest, query?: QueryListDto): Promise<import("../common/types/responseWrappers").DataTotalResponse<ListDto>>;
    getById({ user }: AuthRequest, id: string): Promise<ListDto>;
    create({ user }: AuthRequest, createListDto: CreateListDto): Promise<ListDto>;
    patch({ user }: AuthRequest, id: string, updates: PatchListDto): Promise<void>;
    delete({ user }: AuthRequest, id: string): Promise<void>;
}
