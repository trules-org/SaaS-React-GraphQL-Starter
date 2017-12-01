 # SaaS-Starter for React & GraphQL
This project is intended to create example components on which to base an MVP (Minimum Viable Product) SaaS (Software as a Service) offering.

Every viable SaaS offering requires at a minumum a secure server and a secure client. This project will implement both using [Node.js®](https://nodejs.org/en/about/) and Facebook's [React](https://reactjs.org/) and [GraphQL](http://graphql.org/) with [Apollo](https://www.apollographql.com/) GraphQL client and server tools as the base technologies.

The server API will be GraphQL based, and will include both secure HTTP and Websocket examples. The client will be React based and demonstrate Registration, Login and Subscription-based updates.

The schema contains three types: User, Post and Friendship. 

Users have posts and friends. 
Users must be logged in to create and view posts.
Each User can have many friends. Registering a friend only adds them to the User's list - Each Friendship is uni-directional. 
Users must be logged in to register friends. Users can only register other existing Users as Friends.
When a User registers a friend, it grants the other User permission to view their posts.
Users can only see their own posts and posts created by other Users who have registered them as a friend.

