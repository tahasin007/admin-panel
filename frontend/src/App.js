import TopBar from './components/TopBar/TopBar.jsx'
import SideBar from './components/SideBar/SideBar.jsx'
import Home from './pages/Home/Home.jsx'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './pages/Users/Users.jsx'

function App() {
  return (
    <Router>
      <TopBar />

      <div className='content-wrapper'>
        <SideBar className='side-bar' />
        <Switch>
          <div className='main-content'>
            <Route path='/' exact>
              <Home />
            </Route>

            <Route path='/users' exact>
              <Users />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  )
}

export default App
