
export class Pair<T, V> {
	constructor(private _key: T, private _value: V) { }

	get key(): T {
		return this._key;
	}

	set key(newKey: T) {
		this._key = newKey;
	}

	get value(): V {
		return this._value;
	}

	set value(newValue: V) {
		this._value = newValue;
	}
}

