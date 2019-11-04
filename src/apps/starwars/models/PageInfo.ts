import { Model } from './Model';

const baseUrl: string = 'https://swapi.co/api/people';

export class PageInfo<T extends Model> {
	private _nextPageLink: string;
	private _prevPageLink: string;
	private _pageIndex: number = 0;                   // the 0-based index of page we're currently on
	private _pageSize: number = 10;                   // the number of hits per page (set to default page size)
	private _results: T[] = [];                       // contains only the current, requested page
	private _totalPages: number = 0;                  // the number of pages in the result set
	private _totalResults: number = 0;                // the total number of hits in the current search
	private _searchTerm: string;

	constructor(private _url: string = baseUrl) {
	}

	pullNextPage(): void {
		if (this.hasNextPageLink) {
			this._url = this._nextPageLink;
			// this would be better set AFTER the results come back, but it's functional for these purposes.
			this._pageIndex++;
		}
	}

	pullPrevPage(): void {
		if (this.hasPrevPageLink) {
			this._url = this._prevPageLink;
			this._pageIndex--;
		}
	}

	get pageStartHit(): number {
		return (this._pageIndex * this._pageSize) + 1;
	}

	get firstIndex(): number {
		return this._pageIndex * this._pageSize;
	}

	get currentPage(): number {
		return this._pageIndex + 1;
	}

	get pageIndex(): number {
		return this._pageIndex;
	}

	set pageIndex(newPageIndex) {
		this._pageIndex = newPageIndex;
	}

	get pageSize(): number {
		return this._pageSize;
	}

	get results(): T[] {
		return this._results;
	}

	set results(newResults: T[]) {
		this._results = newResults;
	}

	get totalPages(): number {
		return this._totalPages;
	}

	get totalResults(): number {
		return this._totalResults;
	}

	set totalResults(newTotalResults: number) {
		this._totalResults = newTotalResults;
		this._totalPages = Math.floor(this._totalResults / this._pageSize);
		if ((this.totalResults % this._pageSize) != 0) {
			this._totalPages++;
		}
	}

	get nextPageLink(): string {
		return this._nextPageLink;
	}

	set nextPageLink(newNextPageLink: string) {
		this._nextPageLink = newNextPageLink;
	}

	get prevPageLink(): string {
		return this._prevPageLink;
	}

	set prevPageLink(newPrevPageLink: string) {
		this._prevPageLink = newPrevPageLink;
	}

	get hasNextPageLink(): boolean {
		return this._nextPageLink != null && this._nextPageLink.length > 0;
	}

	get hasPrevPageLink(): boolean {
		return this._prevPageLink != null && this._prevPageLink.length > 0;
	}

	get url(): string {
		return this._url;
	}

	get searchTerm(): string {
		return this._searchTerm;
	}

	set searchTerm(newSearchTerm: string) {
		this._searchTerm = newSearchTerm;
		if (newSearchTerm && newSearchTerm.length > 0) {
			this._url = baseUrl + '/?search=' + newSearchTerm;
		} else {
			this._url = baseUrl;
			this._searchTerm = null;
		}
	}
}
