import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
