import { LocalStorageService } from './LocalStorageService';
import { SessionStorageService } from './SessionStorageService';

export class UtilsProviderFactory {

	addProviderTypes(dependencies: any[]) {
		dependencies.push({ provide: LocalStorageService, useClass: LocalStorageService });
		dependencies.push({ provide: SessionStorageService, useClass: SessionStorageService });
	}
}

