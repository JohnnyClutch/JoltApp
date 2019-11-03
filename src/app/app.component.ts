import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	template: `<router-outlet></router-outlet>`
})
export class App {
	private _name: string = 'Favorite Star Wars Denizens App';
	private _url: string = 'https:/jolt.com';

	constructor(
		public appState: AppState,
		private router: Router
	) {
	}

	ngOnInit() {
		this.router.events
			.subscribe((event) =>  {
				if (event instanceof NavigationEnd) {
					if (event.url === '/') {
						this.router.navigateByUrl('/app');
					}
				}
			});

	}

	get name(): string {
		return this._name;
	}

	set name(newName: string) {
		this._name = newName;
	}

	get url(): string {
		return this._url;
	}

	set url(newUrl: string) {
		this._url = newUrl;
	}
}
