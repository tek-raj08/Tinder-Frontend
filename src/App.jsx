import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import {Provider} from "react-redux"
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <Provider store={appStore}>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Feed/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/connections" element={<Connections/>} />
          <Route path="/requests" element={<Requests/>} />

          </Route>
      </Routes>
    </Router>
    </Provider>
  
  );
}

export default App;
