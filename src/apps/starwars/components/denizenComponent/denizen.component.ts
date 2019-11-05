import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Denizen } from '../../models';
import { I18NService } from '../../directives';

@Component({
	selector: 'denizen',
	template: require('./denizen.component.html'),
	styleUrls: [
		'./denizen.component.css'
	]
})

export class DenizenComponent {

	private _denizen: Denizen;
	private _showNumber: boolean;

	@Input('denizen') set denizen(denizen: Denizen) {
		this._denizen = denizen;
	}
	get denizen(): Denizen {
		return this._denizen;
	}

	@Input('show-favorite-number')
	set showNumber(newShowNumber: boolean) {
		this._showNumber = newShowNumber;
	}
	get showNumber(): boolean {
		return this._showNumber;
	}

	@Output('favorited')
	private denizenClicked = new EventEmitter();

	constructor(private i18nService: I18NService) {
	}

	handleDenizenClicked(ev: any, denizen: Denizen) {
		ev.stopPropagation();

		denizen.favorited = !denizen.favorited;
		if (this.denizenClicked) {
			this.denizenClicked.emit({
				denizen: this._denizen
			});
		}
	}
}
