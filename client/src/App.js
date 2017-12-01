import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import logo from './logo.svg'
import './App.css'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3003/graphql' }),
  cache: new InMemoryCache()
})

// Test the connection with the following query
client.query({ query: gql`{ testConnection }` }).then(console.log('Connection seems ok'))

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SaaS Starter Client with React and GraphQL</h1>
        </header>
        <p className="App-intro">
          This screen will let you:
        </p>
          <ul>
            <li>Register</li>
            <li>Login</li>
          </ul> 
      </div>
      </ApolloProvider>
    )
  }
}

export default App
