const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
	const server = Hapi.server({
		port: process.env.PORT || 9000,
		host: 'localhost',
		routes: {
			cors: {
				origin: ['*'],
			},
			response: {
				failAction: 'log',
			},
			validate: {
				failAction: (request, h, err) => {
					throw err;
				},
			},
		},
	});

	server.route(routes);

	await server.start();
	console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
