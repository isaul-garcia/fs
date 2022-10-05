import loginService from '../services/login'

const loggedUserJSON = JSON.parse(
  window.localStorage.getItem('loggedUser'),
)

const initialState = loggedUserJSON ? loggedUserJSON : null

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'LOGIN':
    return action.data

  case 'LOGOUT':
    return null

  default:
    return state
  }
}

export default loginReducer