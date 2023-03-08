import "./App.css";
import Navbar from "./components/Navbar";
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import CreateChar from "./pages/CreateChar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="">
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new-char' element={<CreateChar />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
