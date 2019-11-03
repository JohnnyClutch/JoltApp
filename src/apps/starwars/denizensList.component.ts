import { Component, OnInit, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Denizen } from './models';
import { DenizenService } from './logic';
import { I18NService } from './directives';

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
	private _denizens: Denizen[];
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

	private handleNavigationResponse = (denizens: Denizen[]): void => {
		this.denizens = denizens;
		this.loadingResults = false;
	}

	private handleNavigationError = (errorResponse: any): void => {
		this._errorMessage = this.i18nService.getMessage('denizens.serverError.generic');
		this.loadingResults = false;
	}

	get loadingResults(): boolean {
		return this._loadingResults;
	}

	set loadingResults(newLoadingResults: boolean) {
		this._loadingResults = newLoadingResults;
	}

	get denizens(): Denizen[] {
		return this._denizens;
	}

	set denizens(newDenizens: Denizen[]) {
		this._denizens = newDenizens;
	}

	get errorMessage(): string {
		return this._errorMessage;
	}

	set errorMessage(newErrorMessage: string) {
		this._errorMessage = newErrorMessage;
	}
}
