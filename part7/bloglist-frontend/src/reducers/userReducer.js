import userService from '../services/users'
import { setNotification } from './notificationReducer'

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch({ type: 'INIT_USERS', data: users })
    } catch (error) {
      setNotification(
        { notification: 'Error fetching list of users', type: 'danger' },
        5
      )
    }
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default userReducer