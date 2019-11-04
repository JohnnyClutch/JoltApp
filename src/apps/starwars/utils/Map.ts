
export abstract class Map<T, V> {
	protected _map: any = { };

	abstract get firstEntry(): V;
	abstract exists(key: T): boolean;
	abstract get(key: T): V;
	abstract keys(): T[];
	abstract put(key: T, value: V): V;
	abstract remove(key: T): boolean;
	abstract get values(): V[];

	clearMap(): void {
		this._map = { };
	}

	get count(): number {
		return Object.keys(this._map).length;
	}
}
