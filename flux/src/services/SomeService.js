import { Actions } from "./Store";

export default class SomeService {

	_timer;
	_time

	constructor(ms = 10000) {
		this._time = ms;
	}

	start() {

		if(this._timer)
			return true;
		
		this._timer = setInterval(
			() => { Actions.addCustomData(Math.random()) }, 
			this._time
		);
	}

	stop() {
		clearInterval(this._timer);
	}
}