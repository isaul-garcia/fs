import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './UserView.module.css'

const User = () => {
  const users = useSelector((state) => state.users)

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <>
      <h1 className={styles.name}>{user.name}</h1>
      <hr />
      <h2 className={styles.title}>Added blogs</h2>
      {user.blogs.length === 0 ? (
        <p className={styles.item}>No blogs added yet</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li className={styles.item} key={blog.id}>
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default User
