import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login.js";
import Profile from "./Pages/Profile.js";
import CanvasPage from "./Pages/CanvasPage.js"; // Import your new Canvas page

function App() {
  const token = localStorage.getItem("token");
  console.log("Token in App:", token);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/canvas/:id"
          element={token ? <CanvasPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
