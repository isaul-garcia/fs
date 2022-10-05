import LoginForm from '../components/LoginForm/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (username, password) => {
    try {
      await dispatch(login(username, password))

      navigate('/')
      dispatch(
        setNotification(
          { notification: `Succesfully logged in as ${username}`, type: 'success' },
          5
        )
      )
    } catch (err) {
      console.error(err)
      dispatch(
        setNotification(
          { notification: 'Wrong credentials', type: 'danger' },
          5
        )
      )
    }
  }

  return (
    <>
      <h2>Profile</h2>
      <hr />
      {user === null || user === undefined ? (
        <LoginForm login={handleLogin} />
      ) : (
        <p>
          Currently logged in as <strong>{user.name} </strong>
        </p>
      )}
    </>
  )
}

export default Login
