import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { offsetLimitPagination } from "@apollo/client/utilities";
import SideDrawer from "./Components/SideDrawer";
import Dashboard from "./Pages/Dashboard";
import Launches from "./Pages/Launches";
import Rockets from "./Pages/Rockets";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: offsetLimitPagination()
        }
      }
    }
  })
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SideDrawer />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/launches" component={Launches} />
          <Route path="/rockets" component={Rockets} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
