import { Component, OnInit, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Denizen, PageInfo } from '../../models';
import { DenizenService } from '../../logic';
import { I18NService } from '../../directives';

@Component({
	selector: 'denizen-list',
	template: require('./denizensList.component.html'),
	styles: [
		require('./denizensList.component.scss').toString()
	],
	encapsulation: ViewEncapsulation.None
})

export class DenizensListComponent implements OnInit {

	private _loadingResults: boolean;
	private _pageInfo: PageInfo<Denizen>;
	private _errorMessage: string;

	constructor(
		private denizenService: DenizenService,
		private i18nService: I18NService
	) {
	}

	ngOnInit(): void {
		this.denizenService.getDenizens().subscribe(this.handleNavigationResponse, this.handleNavigationError);
	}

	private tracker(index: number, denizen: Denizen): number {
		return denizen.id;
	}

	private handleNavigationResponse = (pageInfo: PageInfo<Denizen>): void => {
		this.pageInfo = pageInfo;
		this.loadingResults = false;
	}

	private handleNavigationError = (errorResponse: any): void => {
		this._errorMessage = this.i18nService.getMessage('pageInfo.serverError.generic');
		this.loadingResults = false;
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
