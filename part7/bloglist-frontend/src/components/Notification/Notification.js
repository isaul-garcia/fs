import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  return message && <Alert variant={message.type}>{message?.notification ? message?.notification : message?.error}</Alert>
}

export default Notification
