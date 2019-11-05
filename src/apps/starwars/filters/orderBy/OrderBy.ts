import { Pipe, PipeTransform } from '@angular/core';
import { Utilities } from '../../utils/Utilities';

@Pipe({name: 'sortBy', pure: false})
export class OrderByPipe implements PipeTransform {

	private data: any[] = [];

	transform(input: any, config: string[] = ['+']): any {

		if (input && input.length > 0) {
			if (!Array.isArray(input) || input.length === 0) {
				return input;
			}

			this.data = [...input];
			let sortOrder: string[] = [];

			if (!Array.isArray(config)) {
				sortOrder.push(config);
			} else {
				sortOrder = config;
			}
			switch (typeof this.data[0]) {
				case 'string':
				case 'boolean':
				{
					if (sortOrder[0].charAt(0) === '-') {
						return this.data.sort().reverse();
					} else {
						return this.data.sort();
					}
				}
				case 'number':
				{
					if (sortOrder[0].charAt(0) === '-') {
						return this.data.sort(function(a, b) {
							return b - a;
						});
					} else {
						return this.data.sort(function(a, b) {
							return a - b;
						});
					}
				}
				case 'object':
				{
					let vals: any[] = Utilities.sorter<any>(this.data, sortOrder);
					return vals;
				}
			}
		}
	}
}

export let ORDERBY_PROVIDERS = [
	OrderByPipe
];
