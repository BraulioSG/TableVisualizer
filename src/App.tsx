import './App.scss'

//tools
import { Switch, Route, Redirect } from 'wouter';

//components
import Dashboard from './views/Dashboard/Dashboard';
import NotFound from './views/NotFound/NotFound';

function App() {
  return (
    <Switch>
      <Route path='/'>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
