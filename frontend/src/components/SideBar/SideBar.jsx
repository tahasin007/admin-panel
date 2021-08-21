import './SideBar.scss'
import Nav from 'react-bootstrap/Nav'
import { Storage, Dashboard, Email } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <>
      <div className='side-bar'>
        <Nav defaultActiveKey='/home' className='flex-column' variant='white'>
          <Nav.Link as={Link} to='/'>
            <Dashboard className='mr-2' />
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to='/employees'>
            <Storage className='mr-2' />
            Employees
          </Nav.Link>
          <Nav.Link as={Link} to='/mail'>
            <Email className='mr-2' />
            Email
          </Nav.Link>
        </Nav>
      </div>
    </>
  )
}

export default SideBar
