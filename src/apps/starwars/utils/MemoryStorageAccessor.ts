import { StorageAccessor } from './StorageAccessor';

export class MemoryStorageAccessor implements StorageAccessor {
	private _dataCache: any = {};

	getItem(name: string): any {
		return this._dataCache[name];
	}

	setItem(name: string, value: any): void {
		this._dataCache[name] = value;
	}

	clearItem(name: string): void {
		delete this._dataCache[name];
	}
}
