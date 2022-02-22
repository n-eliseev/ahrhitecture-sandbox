import RoomsController 	from './controller/RoomsController';
import RoomController 	from './controller/RoomController';
import RoomModel 		from './model/Room';

const container = document.querySelectorAll('.sub-app');

const room1Model = new RoomModel('Room 1');

const room1Controller = new RoomController(
	container[0], 
	room1Model
);

const roomsController = new RoomsController();
roomsController
	.add(container[0], room1Model)
	.add(container[1], new RoomModel('Room 2'));

window.roomController = room1Controller;
window.roomsController = roomsController;
