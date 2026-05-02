import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";

import Login from "./pages/Login";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Artists from "./pages/Artists.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* ❌ Without Layout */}
        <Route path="/" element={<Index />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ With Layout */}

        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/artists"
          element={
            <Layout>
              <Artists />
            </Layout>
          }
        />

        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />

        <Route
          path="/booking"
          element={
            <Layout>
              <Booking />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;