import { Injectable, Inject } from '@angular/core';
import { StorageAccessor } from './StorageAccessor';
import { MemoryStorageAccessor } from './MemoryStorageAccessor';

@Injectable()
export class SessionStorageService {
	private _storage: StorageAccessor;

	constructor(@Inject('window') window: any) {
		if (window.sessionStorage) {
			this._storage = new SessionStorageAccessor();
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

export class SessionStorageAccessor implements StorageAccessor {

	getItem(name: string): any {
		let value: any = undefined;

		let storedValue = window.sessionStorage.getItem(name);
		if (storedValue) {
			value = JSON.parse(storedValue);
		}
		return value;
	}

	setItem(name: string, value: any): void {
		if (value) {
			let valueToStore = JSON.stringify(value);
			window.sessionStorage.setItem(name, valueToStore);
		} else {
			this.clearItem(name);
		}
	}

	clearItem(name: string): void {
		window.sessionStorage.removeItem(name);
	}
}
