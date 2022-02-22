import RoomView from "../view/Room";

export default class RoomController {

	model;
	view;

	constructor(container, model) {
		this.view = new RoomView(
			container, 
			model, 
			this.toggleLamp
		);
		this.model = model;
		this.view.render();
	}

	toggleLamp() {
		this.model.toggleLamp();
		this.view.render();
		return this;
	}
}
