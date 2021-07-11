export declare class UserStatistics {
    listCount: number;
    pagesReadCount: number;
    listsCompletedCount: number;
    booksReadCount: number;
    booksOwned: {
        [key: number]: number;
    };
    constructor(listCount: number, pagesReadCount: number, listsCompletedCount: number, booksReadCount: number, booksOwned: {
        [key: number]: number;
    });
}
