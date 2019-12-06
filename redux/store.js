import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import products from './reducers/products'
import users from './reducers/users'
import productReviews from './reducers/productReviews'
import journey from './reducers/journey'
import recommendations from './reducers/recommendations'


const reducer = combineReducers({ products, users, productReviews, journey, recommendations })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store