import { Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";

import Login from "./pages/Login";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Artists from "./pages/Artists";

function App() {
  return (
    <Routes>

      {/* Pages WITHOUT Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Pages WITH Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Index />
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
        path="/artists"
        element={
          <Layout>
            <Artists />
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
  );
}

export default App;