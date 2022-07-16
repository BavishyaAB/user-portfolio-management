import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Home/Home';
import Users from '../Users/Users';
import UserDetail from '../UserDetails/UserDetails';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/users" element={<Users/>}></Route>
            <Route path="/users/:userId" element={<UserDetail/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
