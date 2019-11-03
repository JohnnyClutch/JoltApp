import { LocalStorageService } from './LocalStorageService';
import { SessionStorageService, SessionStorageAccessor } from './SessionStorageService';
import { MemoryStorageAccessor } from './MemoryStorageAccessor';

export class ServicesProviderFactory {
	addProviderTypes(dependencies: any[]) {
		dependencies.push({ provide: MemoryStorageAccessor, useClass: MemoryStorageAccessor });
		dependencies.push({ provide: SessionStorageService, useClass: SessionStorageService });
		dependencies.push({ provide: LocalStorageService, useClass: LocalStorageService });
	}
}
