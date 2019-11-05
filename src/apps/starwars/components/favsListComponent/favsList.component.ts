import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Denizen, PageInfo } from '../../models';
import { DenizenService } from '../../logic';
import { I18NService } from '../../directives';
import { Utilities } from '../../utils';

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
	private dragOptions: any;
	private _favorites: Denizen[] = [];
	private _favsSortConfig: any;

	constructor(
		private denizenService: DenizenService,
		private i18nService: I18NService,
		private router: Router
	) {
		this._favorites = this._favorites.concat(this.denizenService.favorites);
		this._favsSortConfig = {
			animation: 150,
			onUpdate: (ev: any) => {
				this.onFavesSorted(ev);
			}
		};

	}

	private handleFavoriteClicked(ev: any): void {
		if (ev.denizen && ev.denizen.favorited) {
			this.denizenService.addFavoriteDenizen(ev.denizen);
		} else {
			this.denizenService.removeFavoriteDenizen(ev.denizen);
		}
		this._favorites = [];
		this._favorites.concat(this.denizenService.favorites);
		if (this.denizenService.numFavorites === 0) {
			this.backToMain();
		}
	}

	private onFavesSorted(ev: any): void {
		this._favorites.forEach(
			(denizen: Denizen, ndx: number) => {
				denizen.favoriteNumber = ndx + 1;
			}
		);

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

	get favorites(): Denizen[] {
		return this._favorites;
	}

	set favorites(newFavorites: Denizen[]) {
		this._favorites = newFavorites;
	}

	get favsSortConfig(): any {
		return this._favsSortConfig;
	}

	set favsSortConfig(newFavsSortConfig: any) {
		this._favsSortConfig = newFavsSortConfig;
	}
}
