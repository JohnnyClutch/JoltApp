import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { II18NRepo } from './II18NRepo';

@Injectable()
export class I18NRepo extends II18NRepo {
	private static _userLang: string = navigator.language || 'en';
	private _deferred: Promise<any>;

	constructor(private http: Http) {
		super();
	}

	public loadTokens(langLocale: string): Promise<any> {

		if (!this._deferred) {
			this._deferred = new Promise<any>((resolve, reject) => {

				let pull: Function = (pullPath: string): Promise<any> => {
					let deferred: Promise<any> = new Promise<any>((goodCallback, badCallback) => {
						this.http.get(pullPath).subscribe(
							(rawResult) => {
								let result: any = rawResult.json();
								if (result && result.tokens) {
									goodCallback(result.tokens);
								} else {
									badCallback('Invalid i18n file');
								}
							},
							() => {
								badCallback('Invalid lang tokens file.');
							}
						);
					});
					return deferred;
				};

				if (!langLocale) {
					langLocale = I18NRepo._userLang;
				}

				let locales: string[] = [];
				locales.push(langLocale);
				locales.push(langLocale.substring(0, 2));
				locales.push('en');

				let path: string = '/assets/locales/' + langLocale + '/tokens.json';
				pull(path).then(
					(tokens: any) => {
						resolve(tokens);
					},
					() => {
						path = '/assets/locales/en/tokens.json';
						pull(path).then(
							(tokes: any) => {
								resolve(tokes);
							},
							() => {
								path = '/assets/locales/en/tokens.json';
								pull(path).then(
									(tokies: any) => {
										resolve(tokies);
									},
									() => {
										reject('Could not find internationization tokens.');
									}
								);
							}
						);
					}
				);
			});
		}
		return this._deferred;
	}
}
