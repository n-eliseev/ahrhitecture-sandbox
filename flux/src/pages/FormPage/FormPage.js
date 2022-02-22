import Component from "../../services/Component";
import tpl from "./tpl";
import style from './style.css';
import { Actions } from '../../services/Store';

export default class FormPage extends Component {
	
	_value = null;

	constructor(tag, props = {}) {

		if(typeof(props['events']) == 'undefined')
			props['events'] = {};

		props.events['input'] = e => {

			const t = e.target;

			if(t && t.tagName && t.tagName.toString().toLowerCase() == 'input')
			{
				this._value = t.value;

				e.preventDefault();
				e.stopPropagation();
			}
		}
		
		props.events['click'] = e => {

			const t = e.target;

			if(t && t.tagName && t.tagName.toString().toLowerCase() == 'button')
			{
				e.preventDefault();
				e.stopPropagation();

				Actions.addText(this._value);
			}
		}

		super(tag,props);
	}

	componentDidUpdate(oldProps, newProps) {
		return !(oldProps['text'] == newProps['text']);
	}

	render() {
		return this.compile(tpl);
	}
}
