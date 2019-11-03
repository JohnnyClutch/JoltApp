import { DenizenService } from './DenizenService';

export class LogicProviderFactory {

	addProviderTypes(dependencies: any[]) {
		dependencies.push({ provide: DenizenService, useClass: DenizenService });
	}
}

