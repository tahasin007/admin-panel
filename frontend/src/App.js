import TopBar from './components/TopBar/TopBar'
import SideBar from './components/SideBar/SideBar'
import Home from './pages/Home/Home'
import './App.scss'
import { Switch, Route } from 'react-router-dom'
import Users from './pages/Users/Users'
import AddUser from './pages/AddUser/AddUser'
import UploadFile from './pages/UploadFile/UploadFile'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <TopBar />

      <div className='content-wrapper'>
        <SideBar className='side-bar' />

        <div className='main-content'>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/users' exact component={Users}></Route>
            <Route path='/adduser' exact component={AddUser}></Route>
            <Route path='/uploadcsv' exact component={UploadFile}></Route>
          </Switch>
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
