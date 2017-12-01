//schema
export default `
    type User {
        id: Int!
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
        posts: [Post!]!
        friends: [Friendship]!
    }

    type Post {    
        id: Int!    
        text: String!    
        creator: User!
        createdAt: String!  
    }
  
    type Friendship {
        id: Int!
        user: User!
        friend: User!
    }
   
    type Query {        
        allUsers: [User!]!        
        getUser(username: String!): User

        getUserPosts(creatorId: Int!): [Post!]!               
    }
               
    type Mutation {
        register(username: String!, email: String!, password:String!): User!
        login(email:String!, password:String!): String!

        updateUser(username: String!, newUsername: String!): [Int!]!      
        deleteUser(id: Int!): Int!
        
        createPost(creatorId: Int!, text: String): Post!

        createFriendship(userId: Int!, friendId: Int!): Friendship!
    }
`