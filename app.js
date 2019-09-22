'use strict';

require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const cors = require('cors');
const app = express();
const port = process.env.port || 8000;
const resolvers = require('./lib/resolvers');
const isDev = process.env.NODE_ENV !== 'production';
// definiendo le esquema
const typeDefs = readFileSync(
	join(__dirname, 'lib', 'schema.graphql'),
	//
	'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
	'/api',
	gqlMiddleware({
		schema    : schema,
		rootValue : resolvers,
		graphiql  : false
	})
);

app.listen(process.env.PORT || 8000, function() {
	console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
