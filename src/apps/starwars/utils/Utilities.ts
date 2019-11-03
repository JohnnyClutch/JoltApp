import * as moment from 'moment-timezone';
import { Model } from '../models/Model';
import { NgForm, FormControl } from '@angular/forms';

export class Utilities {

	static versionCompare(left: string, right: string): number {
		let leftVal: any = left.match(/([0-9]+|[^0-9]+)/g);
		let rightVal: any = right.match(/([0-9]+|[^0-9]+)/g);
		for (;;) {
			let leftShift: any = leftVal.shift();
			let rightShift: any = rightVal.shift();
			if ((typeof leftShift === 'undefined') && (typeof rightShift === 'undefined') ) {
				return 0;
			}
			if (typeof leftShift === 'undefined') {
				leftShift = '';
			}
			if (typeof rightShift === 'undefined') {
				rightShift = '';
			}

			let leftNum: number = parseInt(leftShift, 10);
			let rightNum: number = parseInt(rightShift, 10);
			if (isNaN(leftNum) || isNaN(rightNum)) {
				// non-numeric comparison
				if (leftShift < rightShift) {
					return -1;
				}
				if (leftShift > rightShift) {
					return 1;
				}
			} else {
				if (leftNum < rightNum) {
					return -1;
				}
				if (leftNum > rightNum) {
					return 1;
				}
			}
		}
	}

	// tokenize == split(',')
	static englishJoinArray(array: Array<any>): string {
		let outStr: string = '';

		if (array.length === 1) {
			outStr = array[0];

		} else if (array.length === 2) {
			outStr = array.join(' and ');

		} else if (array.length > 2) {
			outStr = array.slice(0, -1).join(', ') + ', and ' + array.slice(-1);
		}
		return outStr;
	}

	static removeItem<T extends Model>(array: T[], item: T, field: string = 'id'): Array<T> {
		for (let li: number = 0; li < array.length; li++) {
			if (array[li][field] === item[field]) {
				array.splice(li, 1);
				break;
			}
		}
		return array;
	}

	static getTimezoneOffsetHours(tz: string = null, date): number { 
		return Utilities.getTimezoneOffsetMinutes(tz, date) / 60;
	}

	static getTimezoneOffsetMinutes(tz: string = null, date): number { 
		if (tz === null) {
			tz = moment.tz.guess();
		}
		return moment(date).tz(tz).utcOffset();
	}

	static joinProperty(array: Array<any>, property: string, delimiter: string = ','): string {
		let outStr: string = '';
		delimiter = delimiter || ',';

		for (let li = 0; li < array.length; li++) {
			if (outStr.length > 0) {
				outStr += delimiter;
			}
			outStr += array[li][property];
		}
		return outStr;
	}

	static appendIf(base: string, toAppend: string, whiteChar: string, condition: string): string {
		let truth = condition || toAppend;

		if (truth && whiteChar && base && base.length) {
			base += whiteChar;
		}
		return truth ? (base || '') + toAppend : base;
	}

	static hasCacheExpired(lastPullTime: number, expireTerm: number): boolean {
		let nowDate: Date = new Date();
		let nowTime: number = nowDate.getTime();
		let timeoutValue: number = 60 * 20 * 1000;
		if (expireTerm) {
			timeoutValue = expireTerm;
		}
		let elapsedTime: number = nowTime - lastPullTime;
		return (elapsedTime > timeoutValue);
	}

	static postToCache<T>(list: T[], record: T, idField: string = 'id'): void {
		let found: boolean = false;
		idField = idField || 'id';

		for (let li: number = 0; li < list.length; li++) {
			let listItem: T = list[li];
			if (listItem[idField] === record[idField]) {
				list[li] = record;
				found = true;
				break;
			}
		}
		if (!found) {
			list.push(record);
		}
	}

	static pullFromCache<T>(list: Array<T>, recordId: string | number, idField: string): T {
		let returnedValue: T = null;
		for (let li: number = 0; li < list.length; li++) {
			let listItem: T = list[li];
			if (listItem[idField] === recordId) {
				returnedValue = list.splice(li, 1)[0];
				break;
			}
		}
		return returnedValue;
	}

//
//	static equals(first: Object, second: Object): boolean {
//		return JSON.stringify(first) === JSON.stringify(second);
//	}
//

	static equals(objectA: any, objectB: any): boolean {
		let keysA: string[] = null;
		let keysB: string[] = null;

		if (objectA === objectB) {
			return true;
		}

		if (typeof objectA !== typeof objectB) {
			return false;
		}

		if (objectA && objectB && typeof objectA === 'object') {
			if (objectA.constructor === objectB.constructor) {
				if (objectA instanceof Array) {
					if (objectA.length === objectB.length) {
						return objectA.every(
							function (element, i) {
								let value: boolean = Utilities.equals(element, objectB[i]);
								return value;
							}
						);
					} else {
						return false;
					}
				}
				else if (objectA instanceof RegExp) {
					return (objectA.toString() === objectB.toString());
				} else {
					keysA = Object.keys(objectA);
					keysB = Object.keys(objectB);

					if (keysA.length === keysB.length) {
						return keysA.every(
							function (element) {
								let value: boolean = Utilities.equals(objectA[element], objectB[element]);
								return value;
							}
						);
					} else {
						return false;
					}
				}
			} else {
				return false;
			}
		} else if (typeof objectA === 'function') {
			return (objectA.toString() === objectB.toString());
		} else {
			return (objectA === objectB);
		}
	}

	static startsWith(sourceString: string, checkString: string): boolean {
		let starts: boolean = false;

		if (sourceString && checkString && sourceString.length > 0 && checkString.length > 0) {
			starts = (sourceString.substr(0, checkString.length) === checkString);
		}
		return starts;
	}

	static cloneMembers<T>(source: T, target: T): T {
		for (let key in source) {
			if (source.hasOwnProperty(key)) {
				target[key] = source[key];
			}
		}
		return target;
	}

	static deepCloneObject<T>(source: T, circular: boolean = true): T {

		let propertyIndex,
			descriptor,
			keys,
			current,
			nextSource,
			indexOf,
			copies = [{
				source: source,
				target: Object.create(Object.getPrototypeOf(source))
			}],
			cloneObject = copies[0].target,
			sourceReferences = [source],
			targetReferences = [cloneObject];

		// First in, first out
		while (current = copies.shift()) {
			keys = Object.getOwnPropertyNames(current.source);

			for (propertyIndex = 0; propertyIndex < keys.length; propertyIndex++) {
				// Save the source's descriptor
				descriptor = Object.getOwnPropertyDescriptor(current.source, keys[propertyIndex]);

				if (!descriptor.value || typeof descriptor.value !== 'object') {
					if (!Array.isArray(current.source) && keys[propertyIndex] !== 'length') {
						Object.defineProperty(current.target, keys[propertyIndex], descriptor);
					}
					continue;
				}

				nextSource = descriptor.value;
				descriptor.value = Array.isArray(nextSource) ?
					[] :
					Object.create(Object.getPrototypeOf(nextSource));

				if (circular) {
					indexOf = sourceReferences.indexOf(nextSource);

					if (indexOf !== -1) {
						// The source is already referenced, just assign reference
						descriptor.value = targetReferences[indexOf];
						Object.defineProperty(current.target, keys[propertyIndex], descriptor);
						continue;
					}

					sourceReferences.push(nextSource);
					targetReferences.push(descriptor.value);
				}

				Object.defineProperty(current.target, keys[propertyIndex], descriptor);

				copies.push({source: nextSource, target: descriptor.value});
			}
		}
		return cloneObject as T;
	}

	static copy<T>(source: T): T {
		return JSON.parse(JSON.stringify(source)) as T;
	}

	static findRecord<T extends Model>(list: T[], id: any, idField: string = 'id', originalRecord: boolean = false): T {
		let record: T = null;

		if (list) {
			for (let li: number = 0; li < list.length; li++) {
				let listItem: T = list[li];
				if (listItem[idField] === id) {
					if (originalRecord) {
						record = listItem;
					} else {
						let jonny: Function = listItem['clone'];
						record = jonny();
					}
					break;
				}
			}
		}
		return record;
	}

	static findLowestId<T>(list: Array<T>, field: string): number {
		let lowestId = 0;

		for (let li: number = 0; li < list.length; li++) {
			let item: T = list[li];
			if (li === 0) {
				lowestId = item[field];
			} else if (item[field] < lowestId) {
				lowestId = item[field];
			}
		}
		return lowestId - 1;
	}

	static parseDate(dateField: string): Date {
		let date: Date = null;

		let matches = dateField.match(/(\d+)/);
		if (matches.length > 0) {
			let epoch = parseInt(matches[0], 10);
			date = new Date(epoch);
		}
		return date;
	}

	static isValidRecord(record: any): boolean {
		return (record) && (record.id);
	}

	static isDefined(itemToTest: any): boolean {
		return typeof itemToTest !== 'undefined';
	}

	static dirtifyForm(frm) {
		for (let prop in frm.controls) {
			if (frm.controls[prop] !== undefined && frm.controls.hasOwnProperty(prop)) {
				let control: FormControl = frm.controls[prop] as FormControl;
				control.markAsDirty();
				control.markAsTouched();
			}
		}
	}

	static resetForm(frm: NgForm): void {
		for (let prop in frm.controls) {
			if (frm.controls[prop] !== undefined && frm.controls.hasOwnProperty(prop)) {
				let control: FormControl = frm.controls[prop] as FormControl;
				control['_pristine'] = true;
				control['_touched'] = false;
				control['_status'] = 'VALID';
				control['_errors'] = null;
			}
		}
	}

	static getUTCDate(d: any = null, createNew: boolean = true, format: string = null): moment.Moment {
		let dt: moment.Moment =  null;

		let newDate: Function = (): moment.Moment => {
			let today = new Date();
			let tmzOffset = today.getTimezoneOffset() * 60 * 1000;  // 420 minutes * 60 secs * 1000 ms
			dt = moment.utc(today.getTime());
			return dt;
		};

		if (d) {
			if (format) {
				dt = moment.utc(d, format);
			} else {
				let dat: any = new Date(d);
				dt = moment.utc(new Date(dat));
			}
			if (!dt.isValid() && createNew) {
				dt = newDate();
			}
		} else if (createNew) {
			dt = newDate();
		}
		return dt;
	}

	static getFilenameFromPath(filePath: string): string {
		let filename: string = filePath;

		if (filePath) {
			let slashPos: number = filePath.lastIndexOf('/');
			if (slashPos >= 0) {
				filename = filePath.substring(slashPos + 1).toLowerCase();
			}
		}
		return filename;
	}

	static getImageSuffix(imagePath: string): string {
		let suffix: string = null;

		let perPos: number = imagePath.lastIndexOf('.');
		if (perPos > 2 && perPos > imagePath.length - 5) {
			suffix = imagePath.substring(perPos + 1).toLowerCase();
		}
		return suffix;
	}

	static isImageSuffix(imagePath: string): boolean {
		let isImage: boolean = false;

		let suffix: string = Utilities.getImageSuffix(imagePath);
		if (!suffix) {
			suffix = imagePath;
		}
		if (suffix === 'png' || suffix === 'jpg' || suffix === 'jpeg' ||
				suffix === 'gif' || suffix === 'bmp') {
			isImage = true;
		}
		return isImage;
	}

	static convertImagePathToBase64(pathToImage): Promise<string> {
		let deferred = new Promise<string>((resolve) => {

			let img: any = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload = () => {
				let canvas: any = document.createElement('canvas');
				let ctx: any = canvas.getContext('2d');
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				let dataURL: any = canvas.toDataURL('image/' + this.getImageSuffix(pathToImage));
				resolve(dataURL.replace(/^data:image\/(png|jpg|bmp|jpeg|gif);base64,/, ''));
				canvas = null;
			};
			img.src = pathToImage;
		});
		return deferred;
	}

	static convertFileToBase64(jfile): Promise<string> {

		let deferred = new Promise<string>((resolve) => {

			let reader = new FileReader();
			reader.onload = file => {
				let contents: any = file.target;
				resolve(btoa(contents.result));
			};
			reader.readAsBinaryString(jfile);
		});

		return deferred;
	}

	static decodeBase64(encoded: string): string {
		let l: number = 0;
		let b: number = 0;
		let r: string = '';
		let s: string[] = encoded.split('');
		let m: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
		let i: any;

		for (i in s) {
			if (s.hasOwnProperty(i)) {
				b = (b << 6) + m.indexOf(s[i]);
				l += 6;
				while (l >= 8) r += String.fromCharCode((b >>> (l -= 8)) & 0xff);
			}
		}
		return r;
	}

	static readLocalJsonFile(filePath: File): Promise<string> {

		let deferred: Promise<string> = new Promise<string>(
			(resolve, reject) => {

				if (filePath && filePath.name.length > 3) {
					let reader = new FileReader();
					reader.onload = (file: any) => {
						let text: string = file.target.result;
						if (text && text.length > 0) {
							try {
								let json = JSON.parse(text);
								resolve(json);
							}
							catch (e) {
								reject(`Invalid json in ${filePath}: ${e}`);
							}
						} else {
							reject(`Couldn't read ${filePath}`);
						}
					};
					reader.readAsText(filePath);
				}
			}
		);
		return deferred;
	}

	static fixedRoundedDecimal(numToFix: number, places: number = 2): string {
		let stringNumber: string = '' + numToFix;
		let numCurrentDecimals: number = 0;

		let decPos: number = stringNumber.indexOf('.');
		if (decPos < 0) {
			stringNumber += '.';
		} else {
			numCurrentDecimals = stringNumber.length - decPos - 1;
		}

		if (numCurrentDecimals < places) {
			for (; numCurrentDecimals < places; numCurrentDecimals++) {
				stringNumber = stringNumber + '0';
			}
		} else {
			return '' + Utilities.trimNumber(numToFix);
		}
		return stringNumber;
	}

	static padNumber(numToPad: number, places: number = 3): string {
		let padLen: number = places;
		let stringNumber: string = '' + numToPad;
		let intLen: number = stringNumber.indexOf('.');

		if (intLen < 0) {
			intLen = stringNumber.length;
		}
		let delta: number = padLen - intLen;

		if (delta > 0) {
			for (let li = 0; li < delta; li++) {
				stringNumber = '0' + stringNumber;
			}
		}
		return stringNumber;
	}

	static trimNumber(numToTrim: number, places: number = 2): number {
		let maxPlaces: number = places;

		let stringNumber: string = '' + numToTrim;
		let decimalPos: number = stringNumber.indexOf('.');
		if (decimalPos >= 0) {
			let cropLength: number = decimalPos + maxPlaces + 1;
			stringNumber = stringNumber.substring(0, cropLength);
		}
		return parseFloat(stringNumber);
	}

	static getRandomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static extend(baseObj: any, extend: any) {
		for (let prop in extend) {
			if (extend[prop] !== undefined && extend.hasOwnProperty(prop)) {
				baseObj[prop] = extend[prop];
			}
		}
	}

	// TODO: should this be genericized?
	// fields allow dot notation or a simple name that will be checked only on the top order properties.
	// deepestDepth to recurse.. doesn't apply to fields with a dot notation (0 == unlimited).
	// filter is only meant to search strings
	// invert means "does not contain"
	// contains is the alternative to exactMatch
	static filter(
		records: Array<any>,
		searchTerm: string,
		fields: string[] = null,
		exactMatch: boolean = false,
		invert: boolean = false,
		deepestDepth: number = 0
	): Array<any> {
		let matches: Array<any> = [];
		let term: string = searchTerm ? searchTerm.toLowerCase() : null;
		let objMap: ObjectMap = null;
		let queryFields: any[] = [];

		if (term && fields && fields.length) {
			for (let li = 0; li < fields.length; li++) {
				let field: string = fields[li];
				let queryField: any = {
					field: field
				};

				if (field.indexOf('.') >= 0) {
					queryField.objPath = field;

					let pos: number = queryField.objPath.indexOf('[]');
					if (pos > 0) {
						queryField.objPath = queryField.objPath.substring(0, pos);
						if (queryField.field.length > pos + 3) {
							queryField.arrayField = queryField.field.substring(pos + 3); // must be in the form of: path.to.array[].path.to.field
							if (queryField.arrayField.indexOf('.') > 0) {
								queryField.arrayPropHasPath = true;
							}
						}
					}
					if (field.charAt(0) === '.') {
						queryField.objPath = field.substring(1);
					}
				}
				queryFields.push(queryField);
			}
		}

		let searchObject = (obj: any, currDepth: number, maxDepth: number): boolean => {

			let testAttribute = (attribute: any, cDepth: number = 0, mDepth: number = 0): boolean => {
				let match: boolean = false;

				if (attribute) {
					if (typeof attribute === 'string') {
						let result: boolean = false;
						if (exactMatch) {
							result = attribute && attribute.toLowerCase() === term;
						} else {
							result = (attribute && attribute.toLowerCase().indexOf(term)) >= 0;
						}
						if ((result && !invert) || (invert && !result)) {
							match = true;
						}

					} else if (Array.isArray(attribute)) {
						for (let gg = 0; gg < attribute.length; gg++) {
							let prop: any = attribute[gg];
							if (prop && typeof prop === 'object') {
								if ((!mDepth || cDepth <= mDepth) && searchObject(prop, cDepth + 1, mDepth)) {
									match = true;
									break;
								}
							} else {
								if (testAttribute(prop)) {
									match = true;
									break;
								}
							}
						}

						// TODO: Hashmap and HashSet are having issues if no field specified
					} else if (typeof attribute === 'object') {
						if ((!mDepth || cDepth <= mDepth) && searchObject(attribute, cDepth + 1, mDepth)) {
							match = true;
						}

					} else if (!Number.isNaN(attribute)) {
						let stringNum = '' + attribute;
						let result: boolean = false;
						if (exactMatch) {
							result = stringNum === term;
						} else {
							result = stringNum.indexOf(term) >= 0;
						}
						if ((result && !invert) || (invert && !result)) {
							match = true;
						}
					}
				}
				return match;
			};

			let matched: boolean = false;
			if (obj) {

				if (fields != null && fields.length > 0) {

					for (let li = 0; li < queryFields.length; li++) {
						let field: any = queryFields[li];
						if (field.objPath) {
							if (!objMap) {
								objMap = new ObjectMap();
							}

							let oValue = objMap.getValue(obj, field.objPath);
							if (field.arrayField && Array.isArray(oValue)) {
								for (let bb = 0; bb < oValue.length; bb++) {
									let element: any = oValue[bb];
									if (field.arrayPropHasPath) {
										element = objMap.getValue(element, field.arrayField);
									} else if (field.arrayField) {
										element = element[field.arrayField];
									}
									// test only 1st level attributes on the element
									if (testAttribute(element)) {
										matched = true;
										break;
									}
								}
							} else {
								if (testAttribute(oValue)) {
									matched = true;
									break;
								}
							}

						} else {
							if (testAttribute(obj[field.field], currDepth, maxDepth)) {
								matched = true;
								break;
							}
						}
					}

				} else {
					for (let attr in obj) {
						if (testAttribute(obj[attr], currDepth, maxDepth)) {
							matched = true;
							break;
						}
					}
				}
			}
			return matched;
		};
		if (term) {
			records.forEach(
				(record) => {
					if (searchObject(record, 1, deepestDepth)) {
						matches.push(record);
					}
				}
			);
		}
		return matches;
	}

	// this does a multi-sort on fields arg: [ '+field1', '-field2', etc ]
	static sorter<T>(records: Array<T>, fields: string[]): Array<T> {

		let sortDesc = (a: T, b: T, field: string): number => {
			let comp: number = 0;
			let nullClear: boolean = true;

			if (a === null || a[field] === null) {
				nullClear = false;
				comp = (b !== null) ? 0 : 1;
			} else if (b === null || b[field] === null) {
				nullClear = false;
				comp = -1;
			}

			if (nullClear) {
				if (typeof a[field] === 'string') {
					if (a[field].toLowerCase() < b[field].toLowerCase()) {
						comp =  1;
					} else if (a[field].toLowerCase() > b[field].toLowerCase()) {
						comp = -1;
					}
				} else if (!Number.isNaN(a[field]) || Utilities.getUTCDate(a[field]).isValid()) {
					if (a[field] < b[field]) {
						comp = 1;
					} else if (a[field] > b[field]) {
						comp = -1;
					}
				}
			}
			return comp;
		};

		let sortAsc = (a: T, b: T, field: string) => {
			let comp: number = 0;
			let nullClear: boolean = true;

			if (a === null || a[field] === null) {
				nullClear = false;
				comp = (b !== null) ? 1 : 0;
			} else if (b === null || b[field] === null) {
				nullClear = false;
				comp = 1;
			}

			if (nullClear) {
				if (typeof a[field] === 'string') {
					if (a[field].toLowerCase() < b[field].toLowerCase()) {
						comp =  -1;
					} else if (a[field].toLowerCase() > b[field].toLowerCase()) {
						comp = 1;
					}
				} else if (!Number.isNaN(a[field]) || Utilities.getUTCDate(a[field]).isValid()) {
					if (a[field] < b[field]) {
						comp = -1;
					} else if (a[field] > b[field]) {
						comp = 1;
					}
				}
			}
			return comp;
		};

		return records.sort(
			(a: T, b: T) => {
				let comparison: number = 0;

				for (let li = 0; li < fields.length; li++) {
					let field = fields[li];

					let firstChar: string = field.charAt(0);
					let desc: boolean = (firstChar === '-');
					if (firstChar === '-' || firstChar === '+') {
						field = field.substring(1);
					}
					if (desc) {
						comparison = sortDesc(a, b, field);
					} else {
						comparison = sortAsc(a, b, field);
					}
					if (comparison) {
						break;
					}
				}
				return comparison;
			}
		);
	}

	static hashCode(data: any): number {
		if (typeof data === 'number') {
			return data as number;
		} else {

			if (Array.prototype.reduce) {
				return data.split('').reduce((a, b) => {
					a = ((a << 5) - a) + b.charCodeAt(0);
					return a & a;
				}, 0);

			} else {

				let hash = 0, i, chr, len;
				if (data.length === 0) {
					return hash;
				}
				for (i = 0, len = data.length; i < len; i++) {
					chr   = data.charCodeAt(i);
					hash  = ((hash << 5) - hash) + chr;
					hash |= 0; // Convert to 32bit integer
				}
				return hash;
			}
		}
	}

	static timeDisplay(data: number | string): string {
		let display: string = null;
		if (typeof data !== 'string') {
			if (data >= 60) {
				display = `${Utilities.trimNumber(((data + .5) / 60), 1)}h`;
			} else {
				display = `${Utilities.trimNumber((data + .5), 0)}m`;
			}
		} else {
			display = data as string;
		}
		return display;
	}

	static displayTimeMinutes(data: number | string, units: string = ' mins'): string {
		let display: string = null;
		if (typeof data !== 'string') {
			display = `${Utilities.trimNumber((data + .5) / 60, 0)} ${units}`;
		} else {
			display = data as string;
		}
		return display;
	}

	static getEnumOptions(enumClass): any[] {
		let options: any[] = [];

		const enumValues: any[] = Object.keys(enumClass).map(k => enumClass[k]);
		const names = enumValues.filter(v => typeof v === 'string') as string[];
		const values = enumValues.filter(v => typeof v === 'number') as number[];
		for (let li = 0; li < names.length; li++) {
			options.push({ name: names[li], value: values[li] });
		}
		return options;
	}

	static newGuid(): string {
		let guid: string = '';

		for (let li: number = 0; li < 32; li++) {
			if (li === 8 || li === 12 || li === 16 || li === 20) {
				guid = guid + '-';
			}
			guid = guid + Math.floor(Math.random() * 16).toString(16).toUpperCase();
		}
		return guid;
	}

	static getYearsList(): number[] {
		let yearsList = [];
		for (let li = moment.utc().year() - 5; li <= moment.utc().year() + 45; li++) {
			yearsList.push(li);
		}
		return yearsList;
	}

	static getDaysNames(): string[] {
		let daysNameList = [];

		for (let li = 0; li < 7; li++) {
			daysNameList.push(moment.utc().weekday(li).format('ddd'));
		}
		return daysNameList;
	}

}

export class ObjectMap {

	getValue(rootObj: any, path: string): any {
		let tokens: Array<string> = path.split('.');
		let cursor: any = rootObj;

		for (let ps: number = 0; cursor && ps < tokens.length; ++ps) {
			cursor = cursor[tokens[ps]];
		}
		return cursor;
	}

	setValue(rootObj: any, path: string, newValue: any): void {
		if (path && path.length > 0) {
			let tokens: Array<string> = path.split('.');
			let cursor: any = rootObj;

			for (let ps: number = 0; cursor && ps < tokens.length - 1; ++ps) {
				cursor = cursor[tokens[ps]];
			}
			if (cursor) {
				cursor[tokens[tokens.length - 1]] = newValue;
			}
		}
	}
}

export class Validator {
	invalidate(elem: any): void {
		if (elem) {
			if (elem.hasClass('ng-valid')) {
				elem.removeClass('ng-valid');
			}

			if (!elem.hasClass('ng-invalid')) {
				elem.addClass('ng-invalid');
			}
		}
	}

	validate(elem: any): void {
		if (elem) {
			if (elem.hasClass('ng-invalid')) {
				elem.removeClass('ng-invalid');
			}
			if (!elem.hasClass('ng-valid')) {
				elem.addClass('ng-valid');
			}
		}
	}
}

export class Guid {
	private _guid: string;

	constructor (public guid: string) {
		this._guid = guid;
	}

	public ToString(): string {
		return this._guid;
	}
}
