import {
  Route,
  Routes,
} from "react-router-dom";

import Home from "./Home";
import Login from './components/register/Login'
import Signup from './components/register/Signup'

export default function App() {
  return (
        <Routes>
            <Route  exact path='/Home' element={<Home/>} />
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/forgot-password' element={<Login/>}/>
        </Routes>
  );
}