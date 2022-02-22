import Component from "../../services/Component";
import tpl from './tpl';

export default class Nav extends Component {
	render() {
		return this.compile(tpl);
	}
}


/*import Nav from './Nav';
import Router from '../../services/Router';

export default new Nav(
	'div',
	{
		items: [
			{ url: '/' , title: 'Страница 1' },
			{ url: '/page2' , title: 'Страница 2' }
		],

		events: {
			click : e => {
				
				const t = e.target;

				if(t && t.getAttribute('href'))
				{
					(new Router()).go(t.getAttribute('href'));

					e.preventDefault();
					e.stopPropagation();
				}
			}
		}
	}
);
*/
