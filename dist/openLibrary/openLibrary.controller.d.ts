import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { OpenLibraryService } from './openLibrary.service';
import { OpenLibrarySearchItem, OpenLibrarySearchOptions } from './OpenLibrarySearch';
export declare class OpenLibraryController {
    private readonly openLibraryService;
    constructor(openLibraryService: OpenLibraryService);
    search(searchOptions: OpenLibrarySearchOptions): Promise<DataTotalResponse<OpenLibrarySearchItem>>;
}
