export interface StorageAccessor {
	getItem(name: string): any;
	setItem(name: string, value: any): void;
	clearItem(name: string): void;
}
