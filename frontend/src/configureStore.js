import { createStore } from 'redux'
import iapApp from './reducers'

function allowPromiseDispatch (store) {
  // Amend dispatch to allow asynchronous dispatches
  const defaultDispatch = store.dispatch

  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(defaultDispatch)
    }
    return defaultDispatch(action)
  }
}

function configureStore () {
	const store = createStore(iapApp)
	store.dispatch = allowPromiseDispatch(store)
	return store
}

export default configureStore
