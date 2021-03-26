import { AuthRequest } from 'src/authz/authzUser';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { UpdateListItemOrdinalsDto } from '../definitions/listItem.dto';
import { BookListItemsService } from './bookListItem.service';
import { BookListItemDto, CreateBookListItemDto, PatchBookListItemDto, QueryBookListItemDto } from './definitions/bookListItem.dto';
export declare class BookListItemsController {
    private readonly bookListItemsService;
    constructor(bookListItemsService: BookListItemsService);
    index({ user }: AuthRequest, query?: QueryBookListItemDto): Promise<DataTotalResponse<BookListItemDto>>;
    getById({ user }: AuthRequest, listItemId: string): Promise<BookListItemDto>;
    create({ user }: AuthRequest, createListItemDto: CreateBookListItemDto): Promise<BookListItemDto>;
    updateOrdinals({ user }: AuthRequest, updates: UpdateListItemOrdinalsDto): Promise<void>;
    patch({ user }: AuthRequest, listItemId: string, updates: PatchBookListItemDto): Promise<void>;
    delete({ user }: AuthRequest, listItemId: string): Promise<void>;
}
