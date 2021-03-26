export declare class OpenLibrarySearchResponseItem {
    cover_i: number;
    title: string;
    edition_count: number;
    first_publish_year: number;
    author_name: string[];
    isbn: string[];
    language: string[];
    constructor(cover_i: number, title: string, edition_count: number, first_publish_year: number, author_name: string[], isbn: string[], language: string[]);
}
export declare class OpenLibrarySearchResponse {
    numFound: number;
    start: number;
    docs: OpenLibrarySearchResponseItem[];
}
export declare class OpenLibrarySearchItem {
    thumbnail_url: string;
    title: string;
    edition_count: number;
    first_publish_year: number;
    authors: string[];
    isbn: string;
    language: string[];
    constructor({ cover_i, title, edition_count, first_publish_year, author_name, isbn, language, }: OpenLibrarySearchResponseItem);
}
export declare class OpenLibrarySearchOptions {
    searchString?: string;
    title?: string;
    author?: string;
    constructor(searchString?: string, title?: string, author?: string);
}
