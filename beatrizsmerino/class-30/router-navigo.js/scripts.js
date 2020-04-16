(function (window, Navigo) {
	const Router = (function (root, useHash, hash, Navigo) {
		class Router extends Navigo {
			constructor(root, useHash, hash) {
				super(root, useHash, hash);
				this.init();
			}

			init() {
				document.body.addEventListener('click', (e) => {
					if (e.target !== e.currentTarget && e.target.nodeName === 'A') {
						e.preventDefault();
						this.navigate(e.target.pathname);
					}

					e.stopPropagation();
				}, false);
			}

			set routes(routes) {
				routes = routes || {};
				this.on(routes);
				this.resolve();
			}
		}

		return new Router(root, useHash, hash);
	})(null, true, '#!', Navigo);

	const init = () => {
		const MOUNT_NODE = document.getElementById('app');

		Router.routes = {
			'/': function () {
				MOUNT_NODE.innerHTML = '<h2>You are home</h2>';
			},
			'/cart': function () {
				MOUNT_NODE.innerHTML = '<h2>Shopping Cart</h2><div><a href="/products/5">Product 5</a></div>';
			},
			'/products/:id': function (params) {
				MOUNT_NODE.innerHTML = `<h2>Viewing Product ${params.id}</h2>`;
			}
		};

		Router.hooks({
			"before": function (done, params) {
				console.log('Pre-route hook');
				done();
			},
			"after": function (params, query) {
				console.log('Post-route hook');
			}
		});
	};

	window.addEventListener('load', init, false);
})(window, Navigo);