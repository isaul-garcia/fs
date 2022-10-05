import Nav from 'react-bootstrap/Nav'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import { logout } from '../../reducers/loginReducer'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styles from './Navigation.module.css'

const Navigation = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <Navbar
        className={styles.navbar}
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand>
          <NavLink className={styles.title} to="/">
            BlogList
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link href="#" as="span">
                  <NavLink className={styles.link} to="/">
                    Blogs
                  </NavLink>
                </Nav.Link>

                <Nav.Link href="#" as="span">
                  <NavLink className={styles.link} to="/users">
                    Users
                  </NavLink>
                </Nav.Link>

                <Nav.Link href="#" as="span">
                  <NavLink className={styles.link} to="/cat">
                    Cat
                  </NavLink>
                </Nav.Link>

                <Nav.Link href="#" as="span">
                  <NavLink className={styles.logged} to="/login">
                    <em>
                      Logged in as <strong>{user.name}</strong>
                      <Button className={styles.btn} onClick={handleLogout} type="button">
                        Logout
                      </Button>
                    </em>
                  </NavLink>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="#" as="span">
                <NavLink className={styles.link} to="/login">
                  Login
                </NavLink>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navigation
