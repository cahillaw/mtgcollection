import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Portfolio from './pages/Portfolio'
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"
import PrivateRoute from "./components/PrivateRoute"

import { AuthProvider } from "./contexts/AuthContext"
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path = "/" component={HomePage} />
            <Route path = "/sign-in" component={SignIn} />
            <Route path ="/sign-up" component={SignUp}/>
            <Route path ="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute exact path = "/portfolio" component={Portfolio} />
            <Redirect to ="/"/>
          </Switch>
        </AuthProvider>
      </Router>
  );
}

export default App;
