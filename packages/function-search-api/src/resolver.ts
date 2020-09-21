import { gql } from 'apollo-server';
import { IResolvers } from './generated/graphql';


export const typeDefs = gql`
  type Product {
    name: String
    price: Int
  }
  input UserFilter {
    name: String
  }
  type Query {
    product(id: Int!): Product
    products(filter: UserFilter): [Product]
  }
`;

export const resolvers: IResolvers = {
  Query: {
    product: (_, args, ctx) => ctx.dataSources.productsProvider.getProduct(args),
    products: (_, args, ctx) => ctx.dataSources.productsProvider.getProducts(args)
  }
};
