import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Notifications, Person } from '@material-ui/icons'
import './TopBar.scss'

const TopBar = () => {
  return (
    <>
      <Navbar fixed='top' className='nav-wrapper'>
        <Container>
          <Navbar.Brand>LordAdmin</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <div className='icon-wrapper'>
              <div className='icon-container p-2 text-light'>
                <Notifications/>
              </div>
              <div className='icon-container p-2 text-light'>
                <Person/>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default TopBar
