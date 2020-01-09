import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const Home = React.lazy(() => import('./components/Home/Home'))
const Signup = React.lazy(() => import('./components/Signup/Signup'))
const Signin = React.lazy(() => import('./components/Signin/Signin'))
const AuthHome = React.lazy(() => import('./components/AuthHome/AuthHome'))
const LinkedInAuth = React.lazy(() => import('./components/LinkedInAuth/LinkedInAuth'))

export default class MainRouter extends Component {
  render() {
    return (
      <>
        <Nav />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/sign-in" component={Signin} />
        <Route exact path='/linkedin-users/auth/callback' component={LinkedInAuth} /> 
        <PrivateRoute exact path="/auth-home" component={AuthHome} />

      </Switch>
      </>
    )
  }
}
