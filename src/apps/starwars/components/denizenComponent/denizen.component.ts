import { Component, Input } from '@angular/core';
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

	@Input('denizen') set denizen(denizen: Denizen) {
		this._denizen = denizen;
	}
	get denizen(): Denizen {
		return this._denizen;
	}

	constructor(private i18nService: I18NService) {
	}

	handleDenizenClicked(ev: any, denizen: Denizen) {
		ev.stopPropagation();
		denizen.favorited = !denizen.favorited;
	}
}
