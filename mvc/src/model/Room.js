export default class RoomModel {

	lampIsOn;
	title;

	constructor(title, lampIsOn = false) {
		this.title = title;
		this.lampIsOn = lampIsOn;
	}

	toggleLamp() {
		this.lampIsOn = !this.lampIsOn;
		console.log('Toggle lamp, current status =',this.lampIsOn);
	}
}
