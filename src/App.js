import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NoMatch from './components/NoMatch/NoMatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import {AuthContextProvider, PrivateRoute} from './components/Login/UseAuth'
import Shipment from './components/Shipment/Shipment';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route exact path = "/">
              <Shop></Shop>
            </Route>
            <Route path = "/shop">
              <Shop></Shop>
            </Route>
            <Route path = "/review">
              <Review></Review>
            </Route>
            <Route path = "/inventory">
              <Inventory></Inventory>
            </Route>
            <Route path = "/product/:productKey">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path = "/login">
              <Login></Login>
            </Route>
            <PrivateRoute path = "/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path = "*">
              <NoMatch></NoMatch>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
