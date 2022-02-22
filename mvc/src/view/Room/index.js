import style from './style.css';
import Handlebars from 'handlebars';
import tpl from './tpl';

export default class RoomView {

	model;
	container;
	action;

	constructor(container, model, action = undefined) {
		this.model = model;
		this.container = container;
		this.action = action;
	}

	render() {

		const hasBtn = typeof(this.action) == 'function';

		this.container.innerHTML = Handlebars.compile(tpl)( 
			{
				status: this.model.lampIsOn? 'on' : 'off',
				title : this.model.title,
				button: hasBtn
			}
		);

		if(hasBtn)
			this.container.querySelector('button').addEventListener('click', this.action);
	}
}
