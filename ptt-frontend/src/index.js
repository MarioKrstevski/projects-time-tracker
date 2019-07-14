import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const URL = 'http://localhost:4000';


const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' })
  const client = new ApolloClient({
    uri: URL,
    link: httpLink,
    cache: new InMemoryCache(),
  });

const ApolloWrappedApp = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<ApolloWrappedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
