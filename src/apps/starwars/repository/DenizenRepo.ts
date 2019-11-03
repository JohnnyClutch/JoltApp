// import { map } from 'rxjs/operators';

import { forkJoin as observableForkJoin,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Denizen, PageInfo } from '../models';
import { IDenizenRepo } from './IDenizenRepo';
import { I18NService } from '../directives';

// would typically serve this from a class
const denizensListPath = 'https://swapi.co/api/people'

@Injectable()
export class DenizenRepo extends IDenizenRepo {
	private options: RequestOptions;

	constructor(
		private http: Http,
		private i18n: I18NService
	) {
		super();

		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=UTF-8');
		this.options = new RequestOptions({
			headers: headers
		});
	}

	// get the denizens and do NOT wait for homeworlds to be retrieved
	getDenizens(): Observable<PageInfo<Denizen>> {
		let servable: Observable<PageInfo<Denizen>> = new Observable<PageInfo<Denizen>>(resolver => {

			this.http.get(denizensListPath).subscribe(
				(rawResult) => {
					let result: any = rawResult.json();
					if (result && result.results && Array.isArray(result.results)) {
						let pageInfo: PageInfo<Denizen> = new PageInfo<Denizen>();
						result.results.forEach(
							(rawDenizen: any) => {
								let denizen = new Denizen(rawDenizen);
								pageInfo.results.push(denizen);
								denizen.ext.homeworldLink = rawDenizen.homeworld;
								this.getDenizenHomeworld(denizen);
							}
						);
						resolver.next(pageInfo);
						resolver.complete();
					} else {
						resolver.error('Error retrieving Denizens');
					}
				},
				err => {
					resolver.error(err);
				}
			);
		});
		return servable;
	}

//
//	// as an alternative, get the denizens and wait for homeworlds to be retrieved
//	getDenizensWithHomeworlds(): Observable<PageInfo<Denizen>> {
//		let servable: Observable<PageInfo<Denizen>> = new Observable<PageInfo<Denizen>>(resolver => {
//
//			this.http.get(denizensListPath).subscribe(
//				(rawResult) => {
//					let result: any = rawResult.json();
//					if (result && result.results && Array.isArray(result.results)) {
//						let pageInfo: PageInfo<Denizen> = new PageInfo<Denizen>();
//						let promises: Observable<string>[] = [];
//						result.results.forEach(
//							(rawDenizen: any) => {
//								let denizen = new Denizen(rawDenizen);
//								pageInfo.results.push(denizen);
//								denizen.ext.homeworldLink = rawDenizen.homeworld;
//								promises.push(this.getDenizenHomeworld(denizen));  (this would need an observable)
//							}
//						);
//						if (promises.length > 0) {
//							observableForkJoin(promises).subscribe(
//								(response) => {
//									resolver.next(pageInfo);
//									resolver.complete();
//								}
//							);
//						} else {
//							resolver.next(pageInfo);
//							resolver.complete();
//						}
//					} else {
//						resolver.error('Error retrieving Denizens');
//					}
//				},
//				err => {
//					resolver.error(err);
//				}
//			);
//		});
//		return servable;
//	}
//

	getDenizenHomeworld(denizen: Denizen): void {
		this.http.get(denizen.ext.homeworldLink).subscribe(
			(rawResult) => {
				let result: any = rawResult.json();
				if (result) {
					denizen.homeWorldName = result.name;
				} else {
					denizen.homeWorldName = this.i18n.getMessage('denizens.error.homeworldError', { denizenName: denizen.name });
				}
			},
			err => {
				denizen.homeWorldName = this.i18n.getMessage('denizens.error.homeworldError', { denizenName: denizen.name });
			}
		);
	}

//
//	getDenizen(denizenId: number): Observable<Denizen> {
//		let servable: Observable<Denizen> = new Observable<Denizen>(resolver => {
//			// retrieve from cache or call if missed
//		});
//		return servable;
//	}
//
//	createDenizen(denizen: Denizen): Observable<Denizen> {
//		let restPath: string = this.urlPath.getDenizenServicePath('denizens');
//		let denizenJson: any = denizen.getSubmissionJson();
//		return this.http.post(restPath, denizenJson, this.options).pipe(
//			map((response: Response) => {
//				let denizenJson: any = response.json();
//				denizenJson.guid = denizenJson.denizen_guid;
//				let denizen: Denizen = new Denizen(denizenJson, this.i18n);
//				denizen.ext = denizen.ext;
//				this.cache.postRecord(denizen);
//				return denizen;
//			}));
//	}
//
//	updateDenizen(denizen: Denizen): Observable<Denizen> {
//		let restPath: string = this.urlPath.getDenizenServicePath('denizens/:denizenId', { denizenId: denizen.denizenGuid });
//		let denizenJson: any = denizen.getSubmissionJson();
//		return this.http.put(restPath, denizenJson, this.options).pipe(
//			map((response: Response) => {
//				let denizenJson: any = response.json();
//				let denizen: Denizen = new Denizen(denizenJson, this.i18n);
//				denizen.ext = denizen.ext;
//				this.cache.postRecord(denizen);
//				return denizen;
//			}));
//	}
//
//	removeDenizen(denizen: Denizen): Observable<Denizen> {
//		let restPath: string = this.urlPath.getDenizenServicePath('denizens/:denizenId', { denizenId: denizen.denizenGuid });
//		return this.http.delete(restPath, this.options).pipe(
//			map((response: Response) => {
//				this.cache.removeRecord(denizen);
//				return denizen;
//			}));
//	}
//

}
