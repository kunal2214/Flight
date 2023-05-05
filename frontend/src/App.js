import Header from './Header';
import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import FlightSearch from './components/flightSearch/flightSearch';

function App() {
  return (
   <div className="App">
    <Header />
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/signup"  element={<Signup/>}/>
        <Route path="/search" element={<FlightSearch/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
