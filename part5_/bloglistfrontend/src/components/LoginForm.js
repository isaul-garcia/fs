import { useState } from 'react'

const LoginForm = ({ loginService, blogService, setUser, notify }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      notify({
        message: 'Wrong credentials',
        type: 'error',
      })
    }
  }

  return (
    <div className="form">

      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="inputs">
          Username:<br />
          <input
            id="username"
            type="text"
            value={username}
            title="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="inputs">
          Password:<br />
          <input
            id="password"
            type="password"
            value={password}
            title="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>

    </div>
  )
}

export default LoginForm