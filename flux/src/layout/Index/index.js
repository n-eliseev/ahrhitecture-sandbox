import tpl from './tpl';
import Component from '../../services/Component';
import Nav from '../../components/Nav';
import Router from '../../services/Router';

export default class Index extends Component {

	constructor(tag, props = {}) {

		props['nav'] = new Nav(
			'div',
			{
				items: [
					{ url: '/' , title: 'Главная' },
					{ url: '/form' , title: 'Формой' }
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

		super(tag,props);
 
		/*this.setProps({

			

		});	*/	
	}

	render() {
		return this.compile(tpl);
	}
}
