import { Routes, Route } from "react-router-dom";

import Layout from "./component/Layout";

import Login from "./pages/Login";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArtists from "./pages/AdminArtists";
import Artists from "./pages/Artists";
import ServiceSubCategory from "./pages/ServiceSubCategory";
import ArtistServices from "./pages/ArtistServices";
import ArtistDashboard from "./pages/ArtistDashboard";
import MyBooking from "./pages/mybooking";
import AdminUsers from "./pages/AdminUsers";
import AdminBookingList from "./pages/AdminBookingList";
import AdminServices from "./pages/AdminServices";
import AdminLayout from "./component/AdminLayout";



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
          path="/subcategory/:serviceId"
          element={<Layout><ServiceSubCategory /></Layout>}
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
  path="/artist-services/:artistId"
  element={<ArtistServices />}
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
path="/my-booking" 
element={
<Layout>
  <MyBooking />
</Layout>} />
<Route
  path="/artist/:artistId/services"
  element={<ArtistServices />}
/>

      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      {/* <Route
        path="/artist-dashboard"
        element={
          <Layout>
            <ArtistDashboard />
          </Layout>
        }
      /> */}

  <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="artists" element={<AdminArtists />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="bookings" element={<AdminBookingList />} />
  <Route path="services" element={<AdminServices />} />
</Route>
    </Routes>
    
    
  );
}


export default App;