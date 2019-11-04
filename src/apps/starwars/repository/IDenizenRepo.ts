import { Observable } from 'rxjs';
import { Denizen, PageInfo } from '../models';

export abstract class IDenizenRepo {
	abstract getDenizens(pageInfo: PageInfo<Denizen>): Observable<PageInfo<Denizen>>;
}
