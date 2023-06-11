import {
  Route,
  Routes,
} from "react-router-dom";

import Home from "./Home";

export default function App() {
  return (
        <Routes>
          <Route  exact path='/' element={<Home/>} />
        </Routes>
  );
}