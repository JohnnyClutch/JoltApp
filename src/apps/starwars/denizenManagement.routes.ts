import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DenizenManagementComponent } from './denizenManagement.component';
import { DenizensListComponent } from './denizensList.component';

const denizenRoutes: Routes = [
	{
		path: 'app',
		component: DenizenManagementComponent,
		children: [
			{
				path: '',
				component: DenizensListComponent
			}
		]
	}
];

export const denizenRoutingProviders: any[] = [ ];
export const denizenRouting: ModuleWithProviders = RouterModule.forChild(denizenRoutes);
