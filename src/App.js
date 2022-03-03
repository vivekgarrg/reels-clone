import './App.css';
import SignUp from './Components/SignUp'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './Components/Login';
import {AuthProvider} from './Context/AuthContext'

function App() {
  return (
    <BrowserRouter>
 
    <AuthProvider>
    <Routes>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/signup" element={<SignUp/>}/>
    </Routes>
    </AuthProvider> 
  
    </BrowserRouter>

  
  );
}

export default App;
