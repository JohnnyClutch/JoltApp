import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Denizen, PageInfo } from '../models';
import { IDenizenRepo } from '../repository';

@Injectable()
export class DenizenService {
	constructor(
		private _denizenRepo: IDenizenRepo
	) {
	}

	getDenizens(): Observable<PageInfo<Denizen>> {
		return this._denizenRepo.getDenizens();
	}
}
