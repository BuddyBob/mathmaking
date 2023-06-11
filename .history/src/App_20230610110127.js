import {
  Route,
  Routes,
} from "react-router-dom";

import Home from "./Home";
import Signup from './components/register/Signup'

export default function App() {
  return (
        <Routes>
            <Route  exact path='/' element={<Home/>} />
            <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
  );
}