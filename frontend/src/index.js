// Root for all styles in application
require('./styles/main.scss')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './components/App'
import LandingPage from './components/LandingPage'
import TeamPage from './components/TeamPage'
import UploaderContainer from './containers/UploaderContainer'

import store from './configureStore'

const rootEl = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path='/' component={App}>
        <Route path='team' component={TeamPage} />
        <Route path='upload' component={UploaderContainer} />
        <IndexRoute component={LandingPage} />
      </Route>
    </Router>
  </Provider>,
  rootEl
)
