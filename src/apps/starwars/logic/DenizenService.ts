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

	getDenizens(pageInfo: PageInfo<Denizen>): Observable<PageInfo<Denizen>> {
		return this._denizenRepo.getDenizens(pageInfo);
	}
}
