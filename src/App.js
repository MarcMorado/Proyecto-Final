import "./App.css";
import Navbar from "./components/Navbar";
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import CreateChar from "./pages/CreateChar";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import CharacterList from "./pages/CharacterList";


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="">
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new-char' element={<CreateChar />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/my-characters' element={<CharacterList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
