import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import News from "./components/News";
import Events from "./components/Events";
import Eligibility from "./components/Eligibility";
import Guide from "./components/Guide";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import Logout from "./components/Logout";
import { AuthProvider } from './contexts/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider />
        <Header />
        <div className="Main">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/eligibility" element={<Eligibility />} />
            <Route exact path="/guide" element={<Guide />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
