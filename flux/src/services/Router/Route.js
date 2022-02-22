import { default as renderDOM } from '../../utils/render';

export default class Route {
	
	component;
	path;
	block;
	props;
	tag;

	constructor(path, component, tag = 'div', props = {}) {
		this.path = path;
		this.component = component;
		this.block = null;
		this.props = props;
		this.tag = tag;
	}

	render() {

		if(!this.block)
		{
			this.block = new this.component(this.tag, this.props);
			renderDOM(this.props.rootQuery, this.block);
			return;
		}

		this.block.show();
	}

	navigate(path) {
		if (this.match(path))
			this.render();
	}

	leave(){
		if(this.block)
			this.block.hide();
	}

	match(path) {
		if(this.props.withId)
			return path.includes(this.path);
		return path == this.path;
	}
}
