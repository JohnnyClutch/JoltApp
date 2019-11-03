import { Injectable } from '@angular/core';
import { II18NRepo } from './II18NRepo';

@Injectable()

export class TestI18NRepo extends II18NRepo {
	private _tokens: any = {
		'ribbonTitle': {
			'message': 'EXAMPLE WIDGET <small> a good place for individual components</small>',
			'description': 'If you want, not needed.'
		}
	};

	constructor() {
		super();
	}

	public loadTokens(langLocale: string): Promise<any> {
		return this._tokens;
	}
}
