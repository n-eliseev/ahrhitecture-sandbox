import RoomView from "../view/Room";

export default class RoomsController {
	
	model = [];
	view = [];

	add(container, model) {

		const newID = this.model.length;

		const view = new RoomView(
			container, 
			model, 
			() => { this.toggleLamp(newID); } 
		);

		view.render();

		this.view.push(view);
		this.model.push(model);
		
		return this;
	}

	toggleLamp(roomID) {
		this.model[roomID].toggleLamp();
		this.view[roomID].render();
		return this;
	}

	toggleAll() {
		for(let i=0; i<this.model.length; i++)
		{
			this.model[i].toggleLamp();
			this.view[i].render();
		}
	}
}
