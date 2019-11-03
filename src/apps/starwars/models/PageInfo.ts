import { Model } from './Model';

export class PageInfo<T extends Model> {
	private _results: T[] = [];                       // contains only the current, requested page

	get results(): T[] {
		return this._results;
	}

	set results(newResults: T[]) {
		this._results = newResults;
	}
}
