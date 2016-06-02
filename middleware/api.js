export const API_ROOT = 'http://localhost:7000/api/'

function callApi(endpoint, authenticatedRequest) {
  
  let token = localStorage.getItem('id_token') || null
  let config = {}
  
  if(authenticatedRequest) {
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    } else {
      throw new Error("No token saved!")
    }
  }

  return fetch(API_ROOT + endpoint, config)
    .then(response =>
      response.json()
      .then(resource => ({ resource, response }))
    ).then(({ resource, response }) => {
      if (!response.ok) {
        return Promise.reject(resource)
      }      
      return resource
    })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  
  const callAPI = action[CALL_API]
  
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticatedRequest } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, authenticatedRequest).then(
    response => next(actionWith({
      response,
      authenticatedRequest,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Error!'
    }))
  )
}
