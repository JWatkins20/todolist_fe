import React from 'react';
import LoginScreen from './Authorization/LoginScreen';
import RegistrationScreen from './Authorization/RegistrationScreen'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import DashboardScreen  from './DashboardScreen'
import Cookies from 'js-cookie';

export const base_url = 'http://todolist'

export class Item{
  constructor(description, id){
    this.description = description;
    this.id = id
  }
}

function App() {
  return (
    <div>
      <Router>
        <Routes/>
      </Router>
    </div>
  );
}

const validToken = () =>{
  return Cookies.get('token') !== undefined
}

const Routes =  () => { 
  return (
    <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/registration" component={RegistrationScreen} />
        <PrivateRoute path="/dashboard" component={DashboardScreen} />
    </Switch>
  );
}

const PrivateRoute = ({component: Component, ...rest}) => {
  return(
    <Route 
      {...rest}
      render = {props =>
        validToken() ? (
          Component && <Component {...props}/>
        ) : (
          <Redirect to={"/login"}/>
        )
      }
    />
  )
}


export default App;
