import * as ActionTypes from '../actions'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
const jwtDecode = require('jwt-decode')

function checkTokenExpiry() {
  let jwt = localStorage.getItem('id_token')
  if(jwt) {
    let jwtExp = jwtDecode(jwt).exp;
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if(new Date() < expiryDate) {
      return true;
    }
  }
  return false;
}

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}


function auth(state = {
    isAuthenticated: checkTokenExpiry(),
    profile: getProfile(),
    error: ''
  }, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        error: ''
      })
    case ActionTypes.LOGIN_ERROR:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error
      })
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null
      })
    default:
      return state
    }
}

function jedis(state = {
  isFetching: false,
  allJedis: [],
  error: ''
}, action) {
  switch (action.type) {
    case ActionTypes.JEDIS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.JEDIS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        allJedis: action.response,
        error: ''
      })
    case ActionTypes.JEDIS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        allJedis: [],
        error: action.error
      })
    default:
      return state
  }
}

function jedi(state = {
  isFetching: false,
  singleJedi: {},
  error: ''
}, action) {
  switch (action.type) {
    case ActionTypes.JEDI_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.JEDI_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        singleJedi: action.response,
        error: ''
      })
    case ActionTypes.JEDI_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        singleJedi: {},
        error: action.error
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing,
  auth,
  jedis,
  jedi
})

export default rootReducer
