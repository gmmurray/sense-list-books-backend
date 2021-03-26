import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { GoogleApiBook } from './GoogleApiBook';
import { GoogleApiBookSearchOptions } from './GoogleApiBookSearch';
import { GoogleBooksService } from './googlebooks.service';
export declare class GoogleBooksController {
    private readonly googleBooksService;
    constructor(googleBooksService: GoogleBooksService);
    search(searchOptions: GoogleApiBookSearchOptions): Promise<DataTotalResponse<GoogleApiBook>>;
}
