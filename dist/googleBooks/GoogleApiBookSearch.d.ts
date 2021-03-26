import { GoogleApiBook } from './GoogleApiBook';
export declare enum GoogleApiBookSearchWithin {
    author = "author",
    title = "title",
    none = "none"
}
export declare class GoogleApiBookSearchOptions {
    searchString: string;
    startIndex?: number;
    maxResults?: number;
    orderBy?: 'relevance' | 'newest';
    searchWithin?: GoogleApiBookSearchWithin;
    constructor(searchString: string, startIndex?: number, maxResults?: number, orderBy?: 'relevance' | 'newest', searchWithin?: GoogleApiBookSearchWithin);
}
export declare class GoogleApiBookSearchResponse {
    kind: string;
    totalItems: number;
    items: GoogleApiBook[];
    constructor(kind: string, totalItems: number, items: GoogleApiBook[]);
}
