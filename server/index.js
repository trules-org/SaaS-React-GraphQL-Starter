import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress,graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolvers'
import models from './models'

export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

const PORT = 3003

const app = express()

app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema, context: {models} }))

models.sequelize.sync().then(() => app.listen(PORT))
console.log(`GraphQL Server running on port ${PORT}`)