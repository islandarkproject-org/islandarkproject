// Root for all styles in application
require('./styles/main.scss')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, hashHistory } from 'react-router'

import iapApp from './reducers'
import App from './components/App'

let store = createStore(iapApp)

const rootEl = document.getElementById('root')


// const routes = <Router history={hashHistory}>
//                   <Route path="/" component={App} />
//                   <Route path="/upload" component={Uploader} />
//                 </Router>

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
)
