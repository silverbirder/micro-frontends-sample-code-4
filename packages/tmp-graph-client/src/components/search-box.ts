import gql from 'graphql-tag'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
const link = createHttpLink({ uri: "/graphql" });

// Create the Apollo Client
const client = new ApolloClient({ cache: new InMemoryCache(), link: link });

// Compute graphql documents statically for performance
const query = gql`
  query {
    helloWorld {
      name
      greeting
    }
  }
`;

const childQuery = gql`
  query {
    child {
      foo
      bar
    }
  }
`;

class ConnectedElement extends ApolloQuery<any, any> {
    render() {
        const { data, error, loading } = this;
        const { helloWorld = {} } = data || {}
        return (
            loading ? html`
          <what-spin></what-spin>`
                : error ? html`
          <h1>😢 Such Sad, Very Error! 😰</h1>
          <div>${error ? error.message : 'Unknown Error'}</div>`
                : html`
          <div>${helloWorld.greeting}, ${helloWorld.name}</div>
          <connected-child id="child-component"
              .client="${this.client}"
              .query="${childQuery}"
          ></connected-child>`
        );
    }

    constructor() {
        super();
        //@ts-ignore
        this.client = client;
        this.query = query;
    }
};

customElements.define('connected-element', ConnectedElement)
