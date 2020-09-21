import { ApolloServer } from 'apollo-server';
import { ProductsProvider } from './provider';
import { resolvers, typeDefs } from './resolver';

export interface Context {
  dataSources: {
    productsProvider: ProductsProvider;
  };
}

const dataSources = (): Context['dataSources'] => {
  return {
    productsProvider: new ProductsProvider()
  };
};

const server = new ApolloServer({
  typeDefs,
  // @ts-ignore (FIXME: should be casted to default Resolvers type?)
  resolvers,
  dataSources
});

server.listen().then(({ url }) => {
  console.log(`Search API Server started at 4100 ${url}`);
});
