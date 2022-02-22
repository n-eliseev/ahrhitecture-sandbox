import Store from './Store';

const store = new Store();

const getFormState = () => {

	const 	state= store.getState(),
			form = state.form ?? {};

	return Object.assign(
		{ 
			text : '',
			_lines: [],
			_times: []
		},
		form
	);
}

const getCustomState = () => {

	const 	state= store.getState(),
			custom = state.custom ?? {};

	return Object.assign(
		{ 
			_data: [],
			_times: []
		},
		custom
	);
}

const getUserState = () => {

	const 	state= store.getState(),
			user = state.user ?? {};

	return Object.assign(
		{ 
			_data: [],
			_times: []
		},
		user
	);
}

const explodeText = text => {
	return text.split("\n").map(i => i.trim());
}

const setText = newText => {
	const 	form  = getFormState(),
			_lines= explodeText(newText),
			_times= (Array(_lines.length)).fill((new Date()).toString());

	store.set('form', { 
		...form, 
		text : _lines.join("\n"), 
		_lines: _lines, 
		_times: _times
	});
}

const addText = add => {

	const 	form  = getFormState(),
			_lines= explodeText(add),
			_times= (Array(_lines.length)).fill((new Date()).toString());

	form._lines = form._lines.concat(_lines);
	form._times = form._times.concat(_times);
	form.text = form._lines.join("\n");

	store.set('form', form);
}

const addCustomData = add => {
	const custom = getCustomState();
	custom._data.push(add);
	custom._times.push((new Date()).toString());

	store.set('custom', custom);
}

const addUserData = add => {
	const user = getUserState();
	user._data.push(add);
	user._times.push((new Date()).toString());

	store.set('user', user);
}

window.userStoreAction = addUserData;

export { setText, addText, addCustomData, addUserData }
