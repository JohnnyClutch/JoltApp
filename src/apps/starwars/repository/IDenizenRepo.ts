import { Observable } from 'rxjs';
import { Denizen } from '../models/Denizen';

export abstract class IDenizenRepo {
	abstract getDenizens(): Observable<Denizen[]>;
}
