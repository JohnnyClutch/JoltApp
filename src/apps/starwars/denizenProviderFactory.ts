import { DirectiveProviderFactory } from './directives/DirectiveProviderFactory';
import { RepoProviderFactory } from './repository/RepoProviderFactory';
import { LogicProviderFactory } from './logic/LogicProviderFactory';

export class DenizenProviderFactory
{
	static marshallProviders(useTest: boolean = false): any[] {

		let dependencies: any[ ] = [
			{ provide: 'window', useValue: window },
			{ provide: 'location', useValue: location }
		];

		let directivesFactory: DirectiveProviderFactory = new DirectiveProviderFactory();
		directivesFactory.addProviderTypes(dependencies, useTest);

		let repoFactory: RepoProviderFactory = new RepoProviderFactory();
		repoFactory.addProviderTypes(dependencies, useTest);

		let logicFactory: LogicProviderFactory = new LogicProviderFactory();
		logicFactory.addProviderTypes(dependencies);

		return dependencies;
	}
}
