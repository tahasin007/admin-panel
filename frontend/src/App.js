import TopBar from './components/TopBar/TopBar.jsx'
import SideBar from './components/SideBar/SideBar.jsx'
import Home from './pages/Home/Home.jsx'
import './App.scss'
import { Switch, Route } from 'react-router-dom'
import Users from './pages/Users/Users.jsx'
import AddUser from './pages/AddUser/AddUser.jsx'

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
          </Switch>
        </div>
      </div>
    </>
  )
}

export default App
