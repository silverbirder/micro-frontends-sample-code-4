import { DataSource } from 'apollo-datasource';
import {Maybe, QueryProductArgs, UserFilter} from "src/generated/graphql";

const products = [
  {
    id: 0,
    name: 'Apple',
    price: 100,
  },
  {
    id: 1,
    name: 'Orange',
    price: 150
  },
  {
    id: 2,
    name: 'Banana',
    price: 50
  },
  {
    id: 3,
    name: 'Peach',
    price: 100
  }
];

export class ProductsProvider extends DataSource {
  public async getProduct(args: QueryProductArgs) {
    return products[args.id];
  }

  public async getProducts(args: { filter?: Maybe<UserFilter> } & any) {
    return products.filter((p) => p.name.match(new RegExp(`.*${args?.filter.name}.*`, 'i')));
  }
}
