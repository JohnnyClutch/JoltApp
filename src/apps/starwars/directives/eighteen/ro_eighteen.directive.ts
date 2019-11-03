import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { I18NService } from './I18NService';

declare var jQuery: any;

//
//<h4 *ngIf="action == 'edit'" [ro-i18n] eikey="promos.editPage.titles.edit" [args]="{ promoTitle: promotion.name }"></h4>
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

// This directive is for those tokens whose values will not change (have no arguments that might update at some point)
// (ro stands for run once, not read only)

@Directive({
	selector: '[ro-i18n]'
})
export class ROI18NDirective implements OnInit {
	@Input('ro-i18n') eight: any;
	@Input('eikey') key: string;
	private element: any;

	constructor(private elementWrapper: ElementRef, private i18nService: I18NService) {
		this.element = jQuery(this.elementWrapper.nativeElement);
	}

	ngOnInit(): void {
//
//		if (this.key === 'screens.preview.title') {
//			console.log('found');
//		}
//

		let message: string = this.i18nService.getMessage(this.key, { });
		if (message) {
			this.element.html(message);
		} else {
			console.log(`i18n directive key: ${this.key}, not found.`);
		}
	}
}
