import Route from './Route';

export default class Router {

	static _instance;

	rootQuery;
	routes;
	history;
	currentRoute;

	constructor(rootQuery) {
		
		if(Router._instance)
			return Router._instance;

		this.routes = [];
		this.history = window.history;
		this.currentRoute = null;
		this.rootQuery = rootQuery;

		Router._instance = this;
	}

	use(path, component, tag = 'div', props = {}) {
		this.routes.push(new Route(path, component, tag, { ...props, rootQuery: this.rootQuery }));
		return this;
	}

	start() {
		window.onpopstate = (e => { this._onRoute(window.location.pathname) });
		this._onRoute(window.location.pathname);
	}

	go(path) {
		this.history.pushState({}, '', path);
		this._onRoute(path);
	}

	back() {
		window.history.back();
	}

	forward() {
		window.history.forward();
	}

	_onRoute(path) {

		const route = this.getRoute(path);
		
		if(!route)
			return;

		if(this.currentRoute && this.currentRoute !== route)
			this.currentRoute.leave();

		this.currentRoute = route;

		route.render();
	}

	getRoute(path) {
		return this.routes.find(route => route.match(path));
	}
}
