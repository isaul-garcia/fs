import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Users.module.css'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <>
      <h2>Users</h2>
      <hr />
      <div className={styles.container}>
        <span>
          Username
        </span>
        {users?.map((user) => (
          <span className={styles.item} key={user?.id}>
            <Link className={styles.link} to={`/users/${user.id}`}>
              {user?.username}
            </Link>
          </span>
        ))}
      </div>

      <div className={styles.container}>
        <span>
          Blogs Created
        </span>
        {users?.map((user) => (
          <span className={styles.item} key={user?.id}>
            <Link className={styles.link} to={`/users/${user.id}`}>
              {user.blogs?.length}
            </Link>
          </span>
        ))}
      </div>
    </>
  )
}

export default Users
