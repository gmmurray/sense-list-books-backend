export class UserStatistics {
  constructor(
    public listCount: number,
    public pagesReadCount: number,
    public listsCompletedCount: number,
    public booksReadCount: number,
    public booksOwned: { [key: number]: number },
  ) {}
}
