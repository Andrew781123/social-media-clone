import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Navbar from "./layout/Navbar";
import Login from "./pages/Login";
// import PrivateRoute from "./PrivateRoute";
import { Provider } from "react-redux";
import store from "./Redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth/login' component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
