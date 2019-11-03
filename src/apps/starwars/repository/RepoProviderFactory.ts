import { IDenizenRepo } from './IDenizenRepo';
import { DenizenRepo } from './DenizenRepo';
import { TestDenizenRepo } from './TestDenizenRepo';

export class RepoProviderFactory {

	constructor() { }

	addProviderTypes(dependencies: any[], useTestClasses: boolean = false) {
		if (useTestClasses) {
			dependencies.push({ provide: IDenizenRepo, useClass: TestDenizenRepo });
		} else {
			dependencies.push({ provide: IDenizenRepo, useClass: DenizenRepo });
		}
	}
}
