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

	constructor(private i18nService: I18NService) {
	}

	@Input('denizen') set denizen(denizen: Denizen) {
		this._denizen = denizen;
	}
	get denizen(): Denizen {
		return this._denizen;
	}


//
//	@Output()
//	denizenClicked = new EventEmitter();
//
//	handleDenizenClicked(ev: any) {
//		ev.stopPropagation();
//		if (this.denizenClicked) {
//			this.denizenClicked.emit({
//				denizen: this._denizen,
//				eventDetails: ev
//			});
//		}
//	}
//
}
