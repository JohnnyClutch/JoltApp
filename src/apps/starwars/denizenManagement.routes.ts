import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DenizenManagementComponent } from './denizenManagement.component';
import { DenizensListComponent } from './components';
import { FavsListComponent } from './components';
import { I18NResolver } from './directives';

const denizenRoutes: Routes = [
	{
		path: 'app',
		component: DenizenManagementComponent,
		children: [
			{
				path: '',
				resolve: {
					i18n: I18NResolver
				},
				component: DenizensListComponent
			},
			{
				path: 'faves',
				resolve: {
					i18n: I18NResolver
				},
				component: FavsListComponent
			},

		]
	}
];

export const denizenRoutingProviders: any[] = [ ];
export const denizenRouting: ModuleWithProviders = RouterModule.forChild(denizenRoutes);
