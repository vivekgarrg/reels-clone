import './App.css';
import SignUp from './Components/SignUp'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Components/Login';
import {AuthProvider} from './Context/AuthContext'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Switch>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/signup" component={SignUp}/>
    <PrivateRoute path='/profile/:id' component={Profile}/>
    <PrivateRoute exact path='/' component={Feed}/>
    </Switch>
    </AuthProvider> 
    </BrowserRouter>

  
  );
}

export default App;
