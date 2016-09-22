// Root for all styles in application
require('./styles/main.scss')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import LandingPage from './components/LandingPage'
import TeamPage from './components/TeamPage'

import store from './configureStore'

const rootEl = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='team' component={TeamPage} />
        <IndexRoute component={LandingPage} />
      </Route>
    </Router>
  </Provider>,
  rootEl
)
