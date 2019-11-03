import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { DenizenManagementModule } from '../apps/starwars/denizenManagement.module';
import { RouterModule } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { AppState, InteralStateType } from './app.service';
import { ErrorComponent } from './error/error.component';

// Application wide providers
const APP_PROVIDERS = [
	AppState
];

type StoreType = {
	state: InteralStateType,
	restoreInputValues: () => void,
	disposeOldHosts: () => void
};

class Marshaller {
	static marshallProviders(): any[] {
		let dependencies: any[] = [ ];

		dependencies.push({ provide: 'window', useValue: window });
		dependencies.push({ provide: 'location', useValue: location });
		dependencies.push(ENV_PROVIDERS);
		dependencies.push(APP_PROVIDERS);
		return dependencies;
	}
}

@NgModule({
	bootstrap: [ App ],
	declarations: [
		App
	],
	imports: [
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		DenizenManagementModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(ROUTES, { useHash: true })
	],
	exports: [
	],
	providers: Marshaller.marshallProviders()
})
export class AppModule {
	constructor(
		public appRef: ApplicationRef,
		public appState: AppState
	) {
		console.log('hi');
	}

	hmrOnInit(store: StoreType) {
		if (!store || !store.state) return;
		console.log('HMR store', JSON.stringify(store, null, 2));
		this.appState._state = store.state;
		if ('restoreInputValues' in store) {
			let restoreInputValues = store.restoreInputValues;
			setTimeout(restoreInputValues);
		}

		this.appRef.tick();
		delete store.state;
		delete store.restoreInputValues;
	}

	hmrOnDestroy(store: StoreType) {
		const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		const state = this.appState._state;
		store.state = state;
		store.disposeOldHosts = createNewHosts(cmpLocation);
		store.restoreInputValues  = createInputTransfer();
		removeNgStyles();
	}

	hmrAfterDestroy(store: StoreType) {
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
}

