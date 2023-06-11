import {
  Route,
  Routes,
} from "react-router-dom";

import ForgotPassword from './components/register/ForgotPassword'
import Home from "./Home";
import Login from './components/register/Login'
import MathMaker from './components/mathmaker/MathMaker.js'
import Profile from './components/profile/Profile'
import Schedule from './components/schedule/Schedule'
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
            <Route exact path='/schedule' element={<Schedule/>}/>
        </Routes>
  );
}