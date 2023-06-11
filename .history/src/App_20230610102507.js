import {
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from './components/context/AuthContext';
import Home from "./Home";

export default function App() {
  return (
        <Routes>
          <AuthProvider>
            <Route  exact path='/' element={<Home/>} />
          </AuthProvider>
        </Routes>
  );
}