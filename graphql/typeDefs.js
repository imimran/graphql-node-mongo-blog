const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!

    }
    type Query{
        getPosts: [Post]
    }
`
