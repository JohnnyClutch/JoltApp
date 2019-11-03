import { I18NService, I18NRepo, TestI18NRepo, II18NRepo } from './eighteen';

export class DirectiveProviderFactory {
	addProviderTypes(dependencies: any[], useTest: boolean = false) {
		dependencies.push({ provide: I18NService, useClass: I18NService });
		if (useTest) {
			dependencies.push({ provide: II18NRepo, useClass: TestI18NRepo });
		} else {
			dependencies.push({ provide: II18NRepo, useClass: I18NRepo });
		}
	}
}
