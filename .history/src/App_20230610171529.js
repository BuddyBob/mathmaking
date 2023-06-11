import {
  Route,
  Routes,
} from "react-router-dom";

import ForgotPassword from './components/register/ForgotPassword'
import Home from "./Home";
import Login from './components/register/Login'
import Profile from './components/profile/Profile'
import Signup from './components/register/Signup'

export default function App() {
  return (
        <Routes>
            <Route  exact path='/' element={<Home/>} />
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/mathmaker' element={<MathMaker/>}/>
        </Routes>
  );
}