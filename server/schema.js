//schema
export default `
    type User {
        id: Int!
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String! 
    }

    type Query {        
        allUsers: [User!]!        
        getUser(username: String!): User               
    }
               
    type Mutation {          
        updateUser(username: String!, newUsername: String!): [Int!]!      
        deleteUser(id: Int!): Int!
        register(username: String!, email: String!, password:String!): User!
        login(email:String!, password:String!): String!
    }
`