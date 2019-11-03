// import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Denizen } from '../models';
import { IDenizenRepo } from './IDenizenRepo';

const denizensListPath = 'https://swapi.co/api/people'

@Injectable()
export class DenizenRepo extends IDenizenRepo {
	private options: RequestOptions;

	constructor(
		private http: Http,
	) {
		super();

		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=UTF-8');
		this.options = new RequestOptions({
			headers: headers
		});
	}

	getDenizens(): Observable<Denizen[]> {
		let servable: Observable<Denizen[]> = new Observable<Denizen[]>(resolver => {

			this.http.get(denizensListPath).subscribe(
				(rawResult) => {
					let result: any = rawResult.json();
					if (result && result.results && Array.isArray(result.results)) {
						let denizens: Denizen[] = [];

						result.results.forEach(
							(rawDenizen: any) => {
								let denizen = new Denizen(rawDenizen);
								denizens.push(denizen);
							}
						);
						resolver.next(denizens);
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
