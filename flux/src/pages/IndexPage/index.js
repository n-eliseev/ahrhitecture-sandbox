import { Connect } from '../../services/Store';
import IndexPage from './IndexPage';

export default Connect(
	IndexPage, 
	state => {
		
		const times = [];
	
		for(let i in state)
		{
			if(Array.isArray(state[i]._times))
			{
				state[i]._times.forEach(v => times.push({ 
					value : new Date(v),
					item : i 
				}));
			}
		}

		const text = times
				.sort((a,b) => {
					if(a.value<b.value)
						return 1;
					if(a.value>b.value)
						return -1;
					return 0;
				}).map(
					time => ` -> ${time.item}\t|\t${time.value}`
				).join("\n");
				
		return { text : text };
	}
);
