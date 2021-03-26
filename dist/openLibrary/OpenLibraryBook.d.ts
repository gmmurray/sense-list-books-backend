export declare class OpenLibraryBookAuthor {
    name: string;
    key: string;
    constructor(name: string, key: string);
}
export declare class OpenLibraryBookIdentifier {
    [key: string]: string[];
}
export declare class OpenLibraryBookDetails {
    number_of_pages: number;
    title: string;
    subjects: string[];
    description: string;
    authors: OpenLibraryBookAuthor[];
    identifiers: OpenLibraryBookIdentifier;
    isbn_13?: string[];
    isbn_10: string[];
    publish_date: string;
}
export declare class OpenLibraryBook {
    bib_key: string;
    thumbnail_url: string;
    details: OpenLibraryBookDetails;
    constructor(bib_key: string, thumbnail_url: string, details: OpenLibraryBookDetails);
    static getNormalizedAuthors(authors: OpenLibraryBookAuthor[]): string[];
    static getRelevantIdentifiers(identifiers: OpenLibraryBookIdentifier): Record<string, string>;
}
