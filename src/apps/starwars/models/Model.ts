
export class Model {
	// the json as provided to the constructor
	protected _originalJson: any;
	// a convenience member property designed to hold initial state of the object (for example, place the
	// results of getSubmissionJson() from a newly instantiated model).  You'll have to populate it
	// yourself given that the super constructor is called before the derived class's constructor
	protected _originalState: any;
	// use this for ui processing variables like selected, hidden, etc -- won't be transmitted to server
	public ext: any = { };

	private _id: number;

	constructor(json: any) {
		this._originalJson = json;
		if (json.id) {
			this._id = json.id;
		}
	}

	get originalJson(): any {
		return this._originalJson;
	}

	get originalState(): any {
		return this._originalState;
	}

	set originalState(newState: any) {
		this._originalState = newState;
	}

	get id(): number {
		return this._id;
	}

	set id(newId: number) {
		this._id = newId;
	}
}
