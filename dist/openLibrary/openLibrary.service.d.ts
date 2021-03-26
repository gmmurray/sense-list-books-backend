import { HttpService } from '@nestjs/common';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { OpenLibraryBook } from './OpenLibraryBook';
import { OpenLibrarySearchItem, OpenLibrarySearchOptions } from './OpenLibrarySearch';
export declare class OpenLibraryService {
    private httpService;
    private static base_book_retrieval_url;
    private static base_search_url;
    constructor(httpService: HttpService);
    getBookByIsbn(isbn: string): Promise<OpenLibraryBook>;
    searchBooks(searchOptions: OpenLibrarySearchOptions): Promise<DataTotalResponse<OpenLibrarySearchItem>>;
    private static generateRetrievalUrl;
    private static generateSearchUrl;
}
