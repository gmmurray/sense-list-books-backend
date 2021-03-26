import { HttpService } from '@nestjs/common';
import { DataTotalResponse } from 'src/common/types/responseWrappers';
import { GoogleApiBook } from './GoogleApiBook';
import { GoogleApiBookSearchOptions } from './GoogleApiBookSearch';
export declare class GoogleBooksService {
    private httpService;
    private static base_url;
    constructor(httpService: HttpService);
    getBookByVolumeId(volumeId: string): Promise<GoogleApiBook>;
    searchBooks(searchOptions: GoogleApiBookSearchOptions): Promise<DataTotalResponse<GoogleApiBook>>;
    private static generateRetrievalUrl;
    private static generateSearchUrl;
    private static generateQueryString;
    private static getSearchWithinClause;
}
