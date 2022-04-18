const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose')

const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')


const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect('mongodb://localhost/social-app')
.then(res => {
    console.log('Mongo connect successfuly');
    return server.listen({ port: 5000})
})
.then( res => {
    console.log(`Server Running at ${res.url}`);
})
.catch( err => {
    console.log(err);
})

