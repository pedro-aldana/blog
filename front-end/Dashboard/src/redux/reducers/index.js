import {combineReducers} from 'redux'
import auth from './auth'
import blog from './blog'
import categories from './categories'


export default combineReducers({
    auth,
    blog,
    categories
})