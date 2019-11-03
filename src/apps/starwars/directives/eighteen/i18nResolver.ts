import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { I18NService } from '.';

@Injectable()
export class I18NResolver implements Resolve<any> {
	constructor(private i18NService: I18NService) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let servable: Observable<any> = new Observable<any>(resolver => {
			this.i18NService.loadMessages().then(
				(message: any) => {
					resolver.next(message);
					resolver.complete();
				}
			);
		});
		return servable;
	}
}
