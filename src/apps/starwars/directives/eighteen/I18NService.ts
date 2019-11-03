import { Injectable } from '@angular/core';
import { ObjectMap } from '../../utils';
import { II18NRepo } from './II18NRepo';

@Injectable()
export class I18NService {

	private static _objectMap: ObjectMap = new ObjectMap();
	private static messages: any;

	constructor(private i18nRepo: II18NRepo) {
	}

	public loadMessages(langLocale: string = null): Promise<any> {
		let deferred = new Promise<any>((resolve, reject) => {
			if (!I18NService.messages) {
				this.i18nRepo.loadTokens(langLocale).then(
					(tokens: any) => {
						I18NService.messages = tokens;
						resolve(I18NService.messages);
					}
				);
			} else {
				resolve(I18NService.messages);
			}
		});
		return deferred;
	}

	/**
	 * Get the value corresponding to the argument key and optional arguments.
	 * @param key   name for the desired i18n message object name / value
	 * @param args  substitution values corresponding to variables in the value
	 * @param count used with pluralization instrumentation
	 * @returns internationized string
	 */
	public getMessage(key: string, args: any = null, count: number = 0): string {
		let returnedMessage: string = null;
//
//		if (key === 'offers.selectCounts') {
//			console.log('found');
//		}
//
		if (key) {

			let message: any = null;
			if (args && (typeof args === 'string')) {
				try {
					args = JSON.parse(args);
				}
				catch (ex) {
					args = null;
				}
			}

			let keyValue = I18NService._objectMap.getValue(I18NService.messages, key);
			if (keyValue) {
				if (typeof keyValue === 'string') {
					message = keyValue;

				} else if (keyValue && keyValue.plural && Number.isInteger(count)) {
					switch (count) {
						case 0:
							message = keyValue.plural.zero;
							break;
						case 1:
							message = keyValue.plural.one;
							break;
						case 2:
							message = keyValue.plural.two || keyValue.plural.many;
							break;
						case 3:
							message = keyValue.plural.three || keyValue.plural.many;
							break;
						default:
							message = keyValue.plural.many;
							break;
					}
				}
			}
			if (message) {
				if (args) {
					returnedMessage = this.applySubstitutions(message, args);
				} else {
					returnedMessage = message;
				}
				if (!returnedMessage) {
					console.log(`${key} not found.`);
				}
			} else {
				console.log(`No '${key}' found.`);
			}
		}
		return returnedMessage;
	}

	public getMessageBlock(key: string): any {
		return I18NService._objectMap.getValue(I18NService.messages, key);
	}

	loaded(): boolean {
		return I18NService.messages;
	}

	private applySubstitutions(messageText: string, sub: any): string {
		if (sub) {
			if (Array.isArray(sub)) {
				sub.forEach(
					(subber: string, idx: number) => {
						let regex: RegExp = new RegExp('{' + (idx + 1) + '}', 'g');
						messageText = messageText.replace(regex, subber);
					}
				);
			} else {
				let matchProperties: string[] = [];
				let regex = /{([^}]*)}/gm;
				let match: any = null;
				while ((match = regex.exec(messageText)) !== null) {
					matchProperties.push(match[1]);
				}
				matchProperties.forEach(
					(prop: string) => {
						let regexx: RegExp = new RegExp('{' + prop + '}', 'g');
						messageText = messageText.replace(regexx, sub[prop]);
					}
				);
			}
		}
		return messageText.replace(/\n/g, '<br>');
	}
}
