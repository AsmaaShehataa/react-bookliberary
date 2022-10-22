import "./App.css";
import { Routes, Route} from "react-router-dom";
import Search from './components/Search';
import Home from './components/Home';



function App(){
  return(
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
      </Routes>
  )
}

export default App;
