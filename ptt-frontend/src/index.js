import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient, ApolloLink  } from 'apollo-boost';
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

// const URL = 'http://localhost:4000';

const authLink = setContext((_, { headers }) => {
  const token = 'bde5c430c2b1581c834cd8011f34bec8b7972e15'

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });
// const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' })
// const link = authLink.concat(httpLink);

const client = new ApolloClient({
  // uri: URL,
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  onError: (e) => { console.log(e) }
});

const GET_MY_PROJECTS = gql`
{
  getProjects {
    projectName
    description
    time {
      description
      duration
    }
  }
}
`;

// client.query({ query: GET_MY_PROJECTS }).then(console.log)

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
