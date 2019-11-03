import { I18NService, I18NRepo, TestI18NRepo, II18NRepo, I18NResolver } from './eighteen';

export class DirectiveProviderFactory {
	addProviderTypes(dependencies: any[], useTest: boolean = false) {
		dependencies.push({ provide: I18NService, useClass: I18NService });
		dependencies.push({ provide: I18NResolver, useClass: I18NResolver });
		if (useTest) {
			dependencies.push({ provide: II18NRepo, useClass: TestI18NRepo });
		} else {
			dependencies.push({ provide: II18NRepo, useClass: I18NRepo });
		}
	}
}
