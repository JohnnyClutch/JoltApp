import { Directive, ElementRef, OnInit, Input, DoCheck } from '@angular/core';
import { I18NService } from './I18NService';

declare var jQuery: any;

//
//<h4 *ngIf="action == 'edit'" [i18n] eikey="promos.editPage.titles.edit" [args]="{ promoTitle: promotion.name }"></h4>
//

//
//	"promos": {
//		"editPage": {
//			"titles": {
//				"edit": "Edit Promotion: {promoTitle}"
//			}
//		}
//	}
//


@Directive({
	selector: '[i18n]'
})
export class I18NDirective implements OnInit, DoCheck {
	@Input('i18n') eight: any;
	@Input('eikey') key: string;
	@Input('args') args: any;
	@Input('count') count: number = -1;
	private element: any;

	constructor(private elementWrapper: ElementRef, private i18nService: I18NService) {
		this.element = jQuery(this.elementWrapper.nativeElement);
	}

	ngOnInit(): void {
		let args: any = this.args;
//
//		if (this.key === 'screens.preview.title') {
//			console.log('found');
//		}
//

		let message: string = this.i18nService.getMessage(this.key, args);
		if (message) {
			this.element.html(message);
		} else {
			console.log(`i18n directive key: ${this.key}, not found.`);
		}
	}

	ngDoCheck(): void {
		if (this.args || this.count !== -1) {
			let args: any = this.args;
			let message: string = this.i18nService.getMessage(this.key, args, this.count);
			if (message) {
				this.element.html(message);
			} else {
				console.log(`i18n directive key: ${this.key}, not found.`);
			}
		}
	}
}
