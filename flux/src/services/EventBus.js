export default class EventBus {

	_events = {};

	attach(event, callback) {
		if (!this._events[event])
			this._events[event] = [];
			
		this._events[event].push(callback);
	}

	emit(event, ...args) {

		if(!this._events[event])
			return ;

		this._events[event].forEach(cb => { cb(...args) });
	}

	detach(event, callback) {
		
		if (!this._events[event])
			return;

		this._events[event] = this._events[event].filter((item => item !== callback))
	}
}
