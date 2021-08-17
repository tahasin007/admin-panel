import './SideBar.scss'
import Nav from 'react-bootstrap/Nav'
import { Storage, Dashboard } from '@material-ui/icons'


const SideBar = () => {
  return (
    <>
      <div className='side-bar'>
        <Nav defaultActiveKey='/home' className='flex-column' variant='white'>
            <Nav.Link href='/home'>
                <Dashboard className='mr-2'/>
                Dashboard</Nav.Link>
          <Nav.Link href='/users'>
              <Storage className='mr-2'/>
              Users</Nav.Link>
        </Nav>
      </div>
    </>
  )
}

export default SideBar