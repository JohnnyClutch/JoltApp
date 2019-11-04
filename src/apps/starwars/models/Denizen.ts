import { Model } from './Model';

export class Denizen extends Model {
	private static _idTrac: number = 1;

	private _name: string;
	private _birthYear: string;
	private _formattedStartDate: string;
	private _homeWorld: string;
	private _favorited: boolean = false;

	constructor(json: any) {
		super(json)
		if (!this.id) {
			this.id = Denizen._idTrac++;
		}
		this._name = json.name;
		this._birthYear = json.birth_year;
		this._favorited = json.favorited || false;
	}

	getSubmissionJson(): any {
		return {
			name: this._name,
			birth_year: this._birthYear,
			home_world: this.homeWorldName,
			favorited: this._favorited
		};
	}

	get name(): string {
		return this._name;
	}

	set name(newName: string) {
		this._name = newName;
	}

	set homeWorldName(newHomeWorld: string) {
		this._homeWorld = newHomeWorld;
	}

	// thought about creating a planet object, but planets are big, and they've
	// got a bunch of data I don't want to hold in memory unnecessarily.  Easy
	// to add if  requirements expand (which they won't of course because this is not
	// an ongoing app :-)
	get homeWorldName(): string {
		return this._homeWorld;
	}

	get birthYear(): string {
		return this._birthYear;
	}

	set birthYear(newBirthYear: string) {
		this._birthYear = newBirthYear;
	}

	get favorited(): boolean {
		return this._favorited;
	}

	set favorited(newFavorited: boolean) {
		this._favorited = newFavorited;
	}
}
