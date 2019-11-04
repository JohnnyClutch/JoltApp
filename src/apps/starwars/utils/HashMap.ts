import { Map } from './Map';
import { Pair } from './Pair';
import { Utilities } from './Utilities';

export class HashMap<T, V> extends Map<T, V> {
	protected _map: any = { };

	clearMap(): void {
		this._map = { };
	}

	exists(key: T): boolean {
		let there = false;

		if (key) {
			let hashCode: number = Utilities.hashCode(JSON.stringify(key));
			if (this._map[hashCode]) {
				there = true;
			}
		}
		return there;
	}

	get(key: T): V {
		let value: V = null;
		if (key) {
			let hashCode: number = Utilities.hashCode(JSON.stringify(key));
			if (this._map[hashCode]) {
				value = this._map[hashCode].value;
			}
		}
		return value;
	}

	// TODO: make getter
	keys(): T[] {
		let definedKeys: T[] = [];
		Object.keys(this._map).forEach(
			(key: any) => {
				definedKeys.push(this._map[key].key);
			}
		);
		return definedKeys;
	}

	put(key: T, value: V): V {
		let oldValue: V = null;

		if (key) {
			let hashCode: number = Utilities.hashCode(JSON.stringify(key));

			let containted: Pair<T, V> = this._map[hashCode];
			if (containted) {
				oldValue = containted.value;
				containted.value = value;
			} else {
				this._map[hashCode] = new Pair<T, V>(key, value);
			}
		}
		return oldValue;
	}

	remove(key: T): boolean {
		let found: boolean = false;

		if (key) {
			let hashCode: number = Utilities.hashCode(JSON.stringify(key));
			if (this._map[hashCode]) {
				delete this._map[hashCode];
				found = true;
			}
		}
		return found;
	}

	get count(): number {
		return Object.keys(this._map).length;
	}

	get firstEntry(): V {
		let first: V = null;

		for (let prop in this._map) {
			if (this._map[prop] !== undefined && this._map.hasOwnProperty(prop)) {
				first = this._map[prop].value;
				break;
			}
		}
		return first;
	}

	get values(): V[] {
		let values: V[] = [];

		for (let prop in this._map) {
			if (this._map[prop] !== undefined && this._map.hasOwnProperty(prop)) {
				values.push(this._map[prop].value);
			}
		}
		return values;
	}
}
