import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress,graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

const PORT = 3003

const app = express()

app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }))

app.listen(PORT)