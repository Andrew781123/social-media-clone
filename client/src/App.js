import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./layout/Navbar";
import Login from "./auth/Login";
import NewUser from "./components/user/NewUser";
import EditUser from "./components/user/EditUser";
import PrivateRoute from "./PrivateRoute";
import LoginSuccess from "./auth/LoginSuccess";
import { Provider } from "react-redux";
import store from "./Redux/store";

import { loadUser } from "./Redux/actions/authActions";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route
            exact
            path='/auth/login'
            component={Login}
            someWord={"hello"}
          />
          <Route exact path='/auth/login/success' component={LoginSuccess} />
          <Route exact path='/newUser' component={NewUser} />
          <PrivateRoute exact path='/users/:id/edit' component={EditUser} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
