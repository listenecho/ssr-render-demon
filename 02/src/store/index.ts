import { createStore, applyMiddleware, combineReducers } from 'redux'
import homeReducer from '../page/Home/store/reducer'
import globalReducer from './reducer'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    home: homeReducer,
    app: globalReducer
})


export default (store: any) => {
    return createStore(reducer, store, applyMiddleware(thunk))
}