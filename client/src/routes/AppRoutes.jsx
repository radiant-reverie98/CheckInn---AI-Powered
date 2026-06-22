import { Routes,Route,Navigate } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { SignedOut,SignedIn } from "@clerk/clerk-react";
import HotelDetails from "../pages/HotelDetails";
import MyBookingsPage from "../pages/MyBookingsPage";
import FilterHotels from "../pages/FilterHotels";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          <>
            <SignedOut>
              <LoginPage />
            </SignedOut>

            <SignedIn>
              <Navigate to="/" replace />
            </SignedIn>
          </>
        }
      />

      <Route
        path="/sso-callback"
        element={<AuthenticateWithRedirectCallback />}
      />

      <Route
        path="/register"
        element={
          <>
            <SignedOut>
              <RegisterPage/>
            </SignedOut>

            <SignedIn>
              <Navigate to="/" replace />
            </SignedIn>
          </>
        }
      />
      <Route path="/hotel-details" element={<HotelDetails/>}/>
      <Route path="/hotel-bookings" element={<MyBookingsPage/>}/>
      <Route path="/hotels" element={<FilterHotels/>}/>

      {/* Protected Routes */}
      {/* <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <DashboardPage />
            </SignedIn>

            <SignedOut>
              <Navigate to="/login" replace />
            </SignedOut>
          </>
        }
      /> */}

      {/* 404 */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;