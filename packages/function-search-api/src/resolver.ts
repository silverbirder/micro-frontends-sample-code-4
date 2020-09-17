import { gql } from 'apollo-server';
import { IResolvers } from './generated/graphql';


export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    book(id: Int!): Book
    books: [Book]
  }
`;

export const resolvers: IResolvers = {
  Query: {
    book: (_, args, ctx) => ctx.dataSources.booksProvider.getBook(args),
    books: (_, __, ctx) => ctx.dataSources.booksProvider.getBooks()
  }
};
