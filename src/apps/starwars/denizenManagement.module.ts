import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DenizenManagementComponent } from './denizenManagement.component';
import { DenizenComponent } from './components';
import { DenizensListComponent } from './denizensList.component';
import { DenizenService } from './logic/DenizenService';
import { denizenRouting, denizenRoutingProviders } from './denizenManagement.routes';
import { DENIZEN_RESOLVER_PROVIDERS } from './denizenManagement.resolver';
import { DenizenProviderFactory } from './denizenProviderFactory';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,
		denizenRouting
	],
	providers: DenizenProviderFactory.marshallProviders(),
	declarations: [
		DenizensListComponent,
		DenizenComponent,
		DenizenManagementComponent
	],
	exports: [
		DenizensListComponent,
		DenizenComponent
	]
})
export class DenizenManagementModule {
	constructor (@Optional() @SkipSelf() parentModule: DenizenManagementModule) {
		if (parentModule) {
			throw new Error('DenizenManagementModule is already loaded. Import it only once');
		}
	}
}
