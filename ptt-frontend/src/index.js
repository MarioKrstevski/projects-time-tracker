import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

// const URL = 'https://48p1r2roz4.sse.codesandbox.io';
const URL = 'http://localhost:4000';

const client = new ApolloClient({
  uri: URL,
});

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then(result => console.log(result));

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
