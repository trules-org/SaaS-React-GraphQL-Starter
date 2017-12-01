import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress,graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import typeDefs from './schema'
import resolvers from './resolvers'
import models from './models'

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

// Secret used by jwt
const SECRET = 'qwertyuiop'

const PORT = 3003

const app = express()

// Add a user to the request if the header has a verifiable jwt token
const addUser = async (req) => {
	const token = req.headers.authorization
	try{
		const { user } = await jwt.verify(token, SECRET)
		req.user = user
	} catch ( err ) {
		console.log( err )
	}
	req.next()
}

app.use(cors('*'))
// Comment out the following line to use graphiql
app.use(addUser)
// addUser verifies a token in the header - which can't be added by graphiql
// Use the GraphiQL app for testing
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}))

app.use('/graphql', 
	bodyParser.json(),
	graphqlExpress( req => ({
		schema: schema,
		context: {
			models,
			SECRET,
			user: req.user
		} 
	}))
)

models.sequelize.sync().then(() => app.listen(PORT))
console.log(`GraphQL Server running on port ${PORT}`)