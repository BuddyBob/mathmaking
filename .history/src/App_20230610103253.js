import {
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from './components/context/AuthContext';
import Home from "./Home";
import Signup from './components/register/Signup'

export default function App() {
  return (
        <Routes>
            <Route  exact path='/' element={
            <AuthProvider>
              <Home/>
          </AuthProvider>
          } />
          <Route exact path='/signup' element={
            <Signups/>
          } />
        </Routes>
  );
}