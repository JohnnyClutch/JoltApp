import { Injectable, Inject } from '@angular/core';
import { StorageAccessor } from './StorageAccessor';
import { MemoryStorageAccessor } from './MemoryStorageAccessor';

@Injectable()
export class LocalStorageService {
	private _storage: StorageAccessor;

	constructor(@Inject('window') window: Window) {
		if (window.localStorage) {
			this._storage = new LocalStorageAccessor();
		} else {
			this._storage = new MemoryStorageAccessor();
		}
	}

	setData(name: string, value: any): void {
		this._storage.setItem(name, value);
	}

	getData(name: string): any {
		return this._storage.getItem(name);
	}

	retrieveAndRemoveData(keyName: string): any {
		let dataToReturn = this._storage.getItem(keyName);
		this._storage.clearItem(keyName);
		return dataToReturn;
	}

	clearData(keyName: string): any {
		if (keyName) {
			this._storage.clearItem(keyName);
		}
	}
}

class LocalStorageAccessor implements StorageAccessor {

	getItem(name: string): any {
		let value: any = undefined;

		let storedValue = window.localStorage.getItem(name);
		if (storedValue) {
			value = JSON.parse(storedValue);
		}
		return value;
	}

	setItem(name: string, value: any): void {
		if (value) {
			let valueToStore = JSON.stringify(value);
			window.localStorage.setItem(name, valueToStore);
		} else {
			this.clearItem(name);
		}
	}

	clearItem(name: string): void {
		window.localStorage.removeItem(name);
	}
}
