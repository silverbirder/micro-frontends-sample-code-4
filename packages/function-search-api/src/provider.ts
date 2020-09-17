import { DataSource } from 'apollo-datasource';
import { QueryBookArgs } from './generated/graphql';

const books = [
  {
    id: 0,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: 1,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

export class BooksProvider extends DataSource {
  public async getBook(args: QueryBookArgs) {
    return books[args.id];
  }

  public async getBooks() {
    return books;
  }
}
