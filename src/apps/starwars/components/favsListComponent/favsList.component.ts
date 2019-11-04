import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Denizen, PageInfo } from '../../models';
import { DenizenService } from '../../logic';
import { I18NService } from '../../directives';

@Component({
	selector: 'favs-list',
	template: require('./favsList.component.html'),
	styles: [
		require('./favsList.component.scss').toString(),
		require('../../../../../node_modules/font-awesome/css/font-awesome.css')
	],
	encapsulation: ViewEncapsulation.None
})

export class FavsListComponent {

	private _errorMessage: string;

	constructor(
		private denizenService: DenizenService,
		private i18nService: I18NService,
		private router: Router
	) {
	}

	private handleFavoriteClicked(ev: any): void {
		if (ev.denizen && ev.denizen.favorited) {
			this.denizenService.addFavoriteDenizen(ev.denizen);
		} else {
			this.denizenService.removeFavoriteDenizen(ev.denizen);
		}
		if (this.denizenService.numFavorites === 0) {
			this.backToMain();
		}
	}

	private backToMain(): void {
		this.router.navigateByUrl('/app');
	}

	// Would be much more elaborate with error handling
	get errorMessage(): string {
		return this._errorMessage;
	}

	set errorMessage(newErrorMessage: string) {
		this._errorMessage = newErrorMessage;
	}
}
