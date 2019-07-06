import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Query } from "react-apollo";
import { gql } from 'apollo-boost';

const ExchangeRates = () => (
    <Query
      query={gql`
        {
          rates(currency: "USD") {
            currency
            rate
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>{currency}: {rate}</p>
          </div>
        ));
      }}
    </Query>
  );

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
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

const TestApp = () => {
  return (
    <ApolloProvider client={client}>
       {/* <div>
       <h2>My first Apollo app 🚀</h2>
       <ExchangeRates></ExchangeRates>
      </div> */}
    <App></App>

    </ApolloProvider>
  );
};

ReactDOM.render(<TestApp  />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
