import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      login(username, password)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="form">
      <Form onSubmit={handleLogin}>
        <div className="inputs">
          Username:
          <br />
          <input
            id="username"
            type="text"
            value={username}
            title="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="inputs">
          Password:
          <br />
          <input
            id="password"
            type="password"
            value={password}
            title="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="login-button" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
