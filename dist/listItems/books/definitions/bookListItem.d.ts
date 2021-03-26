import { Types } from 'mongoose';
import { ListItemDomain } from 'src/listItems/definitions/listItem.domain';
import { ListDocument } from 'src/lists/definitions/list.schema';
import { OpenLibraryBook } from '../../../openLibrary/OpenLibraryBook';
import { GoogleApiBook } from 'src/googleBooks/GoogleApiBook';
export declare class BookListItemMeta {
    title: string;
    subtitle: string;
    authors: string[];
    publishedDate: string;
    description: string;
    pageCount: number;
    thumbnail_url: string;
    language: string;
    selfLink: string;
    identifiers?: Record<string, string>;
    constructor(title: string, subtitle: string, authors: string[], publishedDate: string, description: string, pageCount: number, thumbnail_url: string, language: string, selfLink: string, identifiers?: Record<string, string>);
    static create(googleVolume: GoogleApiBook, openLibraryBook?: OpenLibraryBook): BookListItemMeta;
}
export declare class BookListItemDomain extends ListItemDomain {
    isbn: string;
    volumeId: string;
    meta: BookListItemMeta;
    constructor(isbn: string, volumeId: string, meta: BookListItemMeta, list: Types.ObjectId | ListDocument, ordinal: number);
    static create(list: Types.ObjectId | ListDocument, ordinal: number, googleVolume: GoogleApiBook, openLibraryBook?: OpenLibraryBook): BookListItemDomain;
}
