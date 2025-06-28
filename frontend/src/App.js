import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login.js";
import Profile from "./Pages/Profile.js";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
