const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!

    }
    type User {
        id: ID!
        token: String!
        username: String!
        email: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
       
    }
    type Query{
        getPosts: [Post]
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
    }
`
