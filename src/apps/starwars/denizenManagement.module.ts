import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DenizenManagementComponent } from './denizenManagement.component';
import { DenizenComponent } from './components';
import { DenizensListComponent } from './components';
import { FavsListComponent } from './components';
import { DenizenService } from './logic';
import { denizenRouting, denizenRoutingProviders } from './denizenManagement.routes';
import { DENIZEN_RESOLVER_PROVIDERS } from './denizenManagement.resolver';
import { DenizenProviderFactory } from './denizenProviderFactory';
import { ROI18NDirective, I18NDirective } from './directives';
import { OrderByPipe } from './filters';
import { SortablejsModule } from 'angular-sortablejs';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,
		SortablejsModule,
		denizenRouting
	],
	providers: DenizenProviderFactory.marshallProviders(),
	declarations: [
		DenizensListComponent,
		FavsListComponent,
		DenizenComponent,
		DenizenManagementComponent,
		I18NDirective,
		OrderByPipe,
		ROI18NDirective
	],
	exports: [
	]
})
export class DenizenManagementModule {
	constructor (@Optional() @SkipSelf() parentModule: DenizenManagementModule) {
		if (parentModule) {
			throw new Error('DenizenManagementModule is already loaded. Import it only once');
		}
	}
}
