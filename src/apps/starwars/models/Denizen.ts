import { Utilities } from '../utils';

export class Denizen {
	private static _idTrac: number = 1;

	private _name: string;
	private _birthDate: Date;
	private _formattedStartDate: string;
	private _homeWorld: string;
	private _id: number;

	constructor(json: any) {
		this.id = Denizen._idTrac++;
		this._name = json.name;
		this._birthDate = json.birth_date ? new Date(json.birth_date) : new Date();
		this._homeWorld = json.home_world;
	}

	getSubmissionJson(): any {
		return {
			name: this._name,
			birth_date: this._birthDate,
			home_world: this._homeWorld
		};
	}

	get name(): string {
		return this._name;
	}

	set name(newName: string) {
		this._name = newName;
	}

	get homeWorld(): string {
		return this._homeWorld;
	}

	set homeWorld(newSubpackId: string) {
		this._homeWorld = newSubpackId;
	}

	get birthDate(): Date {
		return this._birthDate;
	}

	set birthDate(newStartDate: Date) {
		this._birthDate = newStartDate;
	}

	private formatDate(dt: Date): string {
		let formatted: string = '';
		if (dt) {
			formatted =
				`${dt.getFullYear()}-${Utilities.padNumber(dt.getMonth() + 1, 2)}` +
					`-${Utilities.padNumber(dt.getDate(), 2)}T12:00:00`;
		}
		return formatted;
	}

	private formatDisplayDate(dt: Date): string {
		let formatted: string = '';
		if (dt) {
			formatted = `${Utilities.padNumber(dt.getMonth() + 1, 2)}/${Utilities.padNumber(dt.getDate(), 2)}/${dt.getFullYear()}`;
		}
		return formatted;
	}

	get id(): number {
		return this._id;
	}

	set id(newId: number) {
		this._id = newId;
	}
}
