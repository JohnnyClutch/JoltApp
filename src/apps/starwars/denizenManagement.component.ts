import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: '[starwars]',
	template: require('./denizenManagement.component.html'),
	styles: [
		require('./denizenManagement.component.scss').toString()
	],
	encapsulation: ViewEncapsulation.None
})
export class DenizenManagementComponent {
	constructor() { }
}
