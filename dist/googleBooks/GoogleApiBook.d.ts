export declare class GoogleApiImageLinks {
    smallThumbnail: string;
    thumbnail: string;
    constructor(smallThumbnail: string, thumbnail: string);
}
export declare enum GoogleApiIndustryIdentifierType {
    isbn10 = "ISBN_10",
    isbn13 = "ISBN_13",
    issn = "ISSN",
    other = "OTHER"
}
export declare class GoogleApiIndustryIdentifier {
    type: GoogleApiIndustryIdentifierType;
    identifier: string;
    constructor(type: GoogleApiIndustryIdentifierType, identifier: string);
}
export declare class GoogleApiBookVolumeInfo {
    title: string;
    subtitle: string;
    authors: string[];
    publishedDate: string;
    description: string;
    industryIdentifiers: GoogleApiIndustryIdentifier[];
    pageCount: number;
    imageLinks: GoogleApiImageLinks;
    language: string;
    constructor(title: string, subtitle: string, authors: string[], publishedDate: string, description: string, industryIdentifiers: GoogleApiIndustryIdentifier[], pageCount: number, imageLinks: GoogleApiImageLinks, language: string);
}
export declare class GoogleApiBook {
    id: string;
    selfLink: string;
    volumeInfo: GoogleApiBookVolumeInfo;
    constructor(id: string, selfLink: string, volumeInfo: GoogleApiBookVolumeInfo);
    static getIsbn(industryIdentifiers: GoogleApiIndustryIdentifier[]): string;
    static trimFieldsFromSearchResponse(responseItem: GoogleApiBook): GoogleApiBook;
}
