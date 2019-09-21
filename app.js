'use strict';

require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const cors = require('cors');
const app = express();
const port = process.env.port || 4000;
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
		graphiql  : isDev
	})
);
app.listen(port).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
