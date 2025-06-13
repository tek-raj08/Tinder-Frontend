import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./components/Login";
import {Provider} from "react-redux"
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </Router>
    </Provider>
    // <div>
    //   <h1 className='text-7xl font-bold underline'>Hello World!</h1>
    // </div>
  );
}

export default App;
