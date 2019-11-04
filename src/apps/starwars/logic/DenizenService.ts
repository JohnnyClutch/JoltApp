import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Denizen, PageInfo } from '../models';
import { IDenizenRepo } from '../repository';
import { HashMap, Map, LocalStorageService, Utilities } from '../utils';

const _favoritesKey = 'faveWars';

@Injectable()
export class DenizenService {
	private _favoriteDenizens: Map<string, Denizen> = new HashMap<string, Denizen>();

	constructor(
		private _denizenRepo: IDenizenRepo,
		private _localStorageService: LocalStorageService
	) {
		this.restoreFavoriteDenizensFromLocalStorage()
	}

	getDenizens(pageInfo: PageInfo<Denizen>): Observable<PageInfo<Denizen>> {
		let servable: Observable<PageInfo<Denizen>> = new Observable<PageInfo<Denizen>>(resolver => {
			this._denizenRepo.getDenizens(pageInfo).subscribe(
				(pageInfo: PageInfo<Denizen>) => {
					pageInfo.results.forEach(
						(denizen: Denizen) => {
							if (this._favoriteDenizens.exists(denizen.name)) {
								denizen.favorited = true;
							}
						}
					);
					resolver.next(pageInfo);
					resolver.complete();
				}
			);
		});
		return servable;
	}

	// these would obviously return Observables if interacting with a backend
	removeFavoriteDenizen(denizen: Denizen): void {
		// using name since it's unique in the set of results, would use a guid or id if available
		this._favoriteDenizens.remove(denizen.name);
	}

	addFavoriteDenizen(denizen: Denizen) {
		this._favoriteDenizens.put(denizen.name, denizen);
	}

	get favorites(): any {
		return this._favoriteDenizens.values;
	}

	private restoreFavoriteDenizensFromLocalStorage(): void {
		let faves = this._localStorageService.getData(_favoritesKey);
		if (faves) {
			faves.forEach(
				(fave: any) => {
					let denizen: Denizen = new Denizen(fave);
					this._favoriteDenizens.put(denizen.name, denizen);
				}
			);
		}
	}

	private storeFavoriteDenizensToLocalStorage(): void {
		let saveData: any[] = this._favoriteDenizens.values.map(
			(fave: Denizen) => {
				return fave.getSubmissionJson();
			}
		);
		this._localStorageService.setData(_favoritesKey, saveData);
	}
}
