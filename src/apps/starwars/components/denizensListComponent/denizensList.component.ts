import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Denizen, PageInfo } from '../../models';
import { DenizenService } from '../../logic';
import { I18NService } from '../../directives';

@Component({
	selector: 'denizen-list',
	template: require('./denizensList.component.html'),
	styles: [
		require('./denizensList.component.scss').toString(),
		require('../../../../../node_modules/font-awesome/css/font-awesome.css')
	],
	encapsulation: ViewEncapsulation.None
})

export class DenizensListComponent implements OnInit {

	private _loadingResults: boolean;
	private _pageInfo: PageInfo<Denizen> = new PageInfo<Denizen>();
	private _errorMessage: string;

	constructor(
		private denizenService: DenizenService,
		private i18nService: I18NService,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.denizenService.getDenizens(this._pageInfo).subscribe(this.handleNavigationResponse, this.handleNavigationError);
	}

	private routeToFavorites(): void {
		this.router.navigateByUrl('/app/faves');
	}

	private submitSearch(): void {
		this.denizenService.getDenizens(this._pageInfo).subscribe(this.handleNavigationResponse, this.handleNavigationError);
	}

	private retrieveNextPage(): void {
		if (this.pageInfo.hasNextPageLink) {
			this.pageInfo.pullNextPage();
			this.denizenService.getDenizens(this._pageInfo).subscribe(this.handleNavigationResponse, this.handleNavigationError);
		}
	}

	private retrievePrevPage(): void {
		if (this.pageInfo.hasPrevPageLink) {
			this.pageInfo.pullPrevPage();
			this.denizenService.getDenizens(this._pageInfo).subscribe(this.handleNavigationResponse, this.handleNavigationError);
		}
	}

	private tracker(index: number, denizen: Denizen): number {
		return denizen.id;
	}

	private handleNavigationResponse = (pageInfo: PageInfo<Denizen>): void => {
		this.loadingResults = false;
	}

	private handleNavigationError = (errorResponse: any): void => {
		this._errorMessage = this.i18nService.getMessage('pageInfo.serverError.generic');
		this.loadingResults = false;
	}

	private handleFavoriteClicked(ev: any): void {
		if (ev.denizen && ev.denizen.favorited) {
			this.denizenService.addFavoriteDenizen(ev.denizen);
		} else {
			this.denizenService.removeFavoriteDenizen(ev.denizen);
		}
	}

	get loadingResults(): boolean {
		return this._loadingResults;
	}

	set loadingResults(newLoadingResults: boolean) {
		this._loadingResults = newLoadingResults;
	}

	get pageInfo(): PageInfo<Denizen> {
		return this._pageInfo;
	}

	set pageInfo(newPageInfo: PageInfo<Denizen>) {
		this._pageInfo = newPageInfo;
	}

	// Would be much more elaborate with error handling
	get errorMessage(): string {
		return this._errorMessage;
	}

	set errorMessage(newErrorMessage: string) {
		this._errorMessage = newErrorMessage;
	}
}
