import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import {composeWithDevTools} from 'redux-devtools-extension'


const initialState = {}

const mddleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...mddleware))
)

export default store