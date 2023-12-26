const { gql } = require("apollo-server");

const typeDefs = gql`
    type User{
        id: ID!
        name: String!
        username: String!
        age:Int!
        nationality: Nationality!
        friends: [User]
        favoriteMovies:[Movie]
    }

    type movie{
        id: ID!
        name: String!
        yearOfPublication:Int!
        isInTheaters: Boolean!
    }

    type Query{
        users: [User!]!
        user(id: ID!): User!
        movies:[Movie!]!
        movie(name:String!):Movie!
    }
     
    input CreateUserInput{
        name: String!
        username: String!
        age:Int!
        nationality: Nationality = BRAZIL
    }

    input UpdateUserInput{
        id: ID!
        newUsername: String!
    }

    type Mutations{
        createUser(input: CreateUserInput!): User!
        updateUsername(input: UpdateUserInput!): User!
        deleteUser(id: ID!): User
    }

    enum Nationality{
        CANARA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }
`

module.exports = typeDefs