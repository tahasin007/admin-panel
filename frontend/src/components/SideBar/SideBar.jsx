import './SideBar.scss'
import Nav from 'react-bootstrap/Nav'
import { Storage, Dashboard } from '@material-ui/icons'


const SideBar = () => {
  return (
    <>
      <div className='side-bar'>
        <Nav defaultActiveKey='/home' className='flex-column' variant='white'>
            <Nav.Link href='/'>
                <Dashboard className='mr-2'/>
                Dashboard</Nav.Link>
          <Nav.Link href='/employees'>
              <Storage className='mr-2'/>
              Employees</Nav.Link>
        </Nav>
      </div>
    </>
  )
}

export default SideBar
