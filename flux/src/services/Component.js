import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export default class Component {
	
	static EVENT_INIT 		= 'init';
    static EVENT_FLOW_CDM 	= 'flow:component-did-mount';
    static EVENT_FLOW_CDU	= 'flow:component-did-update';
    static EVENT_FLOW_RENDER= 'flow:render';

	_props;
	_children;
	_id;
	_element;
	_meta;
	_eventBus;

	constructor(tag = 'div', propsAndChilds = {}) {

		const { children, props } = this.getChildren(propsAndChilds);
		
		this._eventBus = new EventBus()
		this._id = makeUUID();
		//this._children = children;
		this._children = this.makePropsProxy(children);
		this._props = this.makePropsProxy({ ...props, __id: this._id });
		this._meta = { tag, props };

		this.registerEvents();
		this._eventBus.emit(Component.EVENT_INIT);
	}

	registerEvents() {
		this._eventBus.attach(Component.EVENT_INIT, this.init.bind(this));
		this._eventBus.attach(Component.EVENT_FLOW_CDM, this._componentDidMount.bind(this));
		this._eventBus.attach(Component.EVENT_FLOW_CDU, this._componentDidUpdate.bind(this));
		this._eventBus.attach(Component.EVENT_FLOW_RENDER, this._render.bind(this));
	}

	init() {
		this._element = this.createDocumentElement(this._meta?.tag);
		this._eventBus.emit(Component.EVENT_FLOW_RENDER);
	}

	createDocumentElement(tag) {
		const element = document.createElement(tag);
		if (this._props.settings?.withInternalID) element.setAttribute('data-id', this._id);
		return element;
	}

	_render() {
		const block = this.render();
		this.removeEvents();
		this._element.innerHTML = '';
		this._element.appendChild(block);
		this.addEvents();
	}

	render() {}

	addEvents() {
		
		const { events = {} } = this._props;

		Object.keys(events).forEach((eventName) => {
			this._element.addEventListener(eventName, events[eventName]);
		});
	}

	removeEvents() {
		const { events = {} } = this._props;

		Object.keys(events).forEach((eventName) => {
			this._element.removeEventListener(eventName, events[eventName]);
		});
	}

	getChildren(propsAndChilds) {
		
		const children = {};
		const props = {};

		Object.keys(propsAndChilds).forEach(key => {
			if (propsAndChilds[key] instanceof Component)
				children[key] = propsAndChilds[key];
			else 
				props[key] = propsAndChilds[key];
		});

		return { children, props };
	}

	compile(template, props) {
		
		if(typeof(props) == 'undefined')
			props = this._props;

		const propsAndStubs = { ...props };

		Object.entries(this._children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});

		const fragment = this.createDocumentElement('template');
		fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

		Object.values(this._children).forEach(child => {
			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
			if(stub)
				stub.replaceWith(child.getContent());
		});

		return fragment.content;
	}

	_componentDidMount() {
		this.componentDidMount();
		Object.values(this._children).forEach(child => { child.dispatchComponentDidMount() });
	}

	componentDidMount() {}

	dispatchComponentDidMount() {
		this._eventBus.emit(Component.EVENT_FLOW_CDM);
		if (Object.keys(this._children).length)
			this._eventBus.emit(Component.EVENT_FLOW_RENDER);
	}

	_componentDidUpdate(oldProps, newProps) {
		const isReRender = this.componentDidUpdate(oldProps, newProps);
		if(isReRender)
			this._eventBus.emit(Component.EVENT_FLOW_RENDER);
	}

	componentDidUpdate(oldProps, newProps) {
		return true;
	}

	setProps(newProps) {

		if (!newProps)
			return;

		const { children, props } = this.getChildren(newProps);

		if(Object.values(children).length)
			Object.assign(this._children, children);

		if(Object.values(props).length)		
			Object.assign(this._props, props);
	}

	makePropsProxy(props) {
		
		return new Proxy(props, {
			
			get(target, prop) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			
			set: (target, prop, value) => {
				const oldValue = { ...target };
				target[prop] = value;
				this._eventBus.emit(Component.EVENT_FLOW_CDU, oldValue, target);
				return true;
			},

		});
	}

	show() {
		this.getContent().style.display = 'block';
	}

	hide() {
		this.getContent().style.display = 'none';
	}

	getContent() {
		return this._element;
	}
}
