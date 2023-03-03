import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./components/nav/Main";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routes/PrivateRoute";
import RentHouse from "./pages/user/ad/RentHouse";
import RentLand from "./pages/user/ad/RentLand";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import SingleAd from "./pages/ad/SingleAd";
import Footer from "./components/nav/Footer";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import AdEdit from "./pages/user/ad/AdEdit";
import Wishlist from "./pages/user/Wishlist";
import Enquiries from "./pages/user/Enquiries";
import Agents from "./pages/Agents";
import Agent from "./pages/Agent";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Search from "./pages/Search";

const PageNotFound = () => {
  return (
    <>
      <div className="text-center p-5">404 PAGE NOT FOUND</div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <SearchProvider>
          <Main />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/account-activate/:token" element={<AccountActivate />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/access-account/:resetCode" element={<AccessAccount />} />
            <Route path="/ad/:slug" element={<SingleAd />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agent/:username" element={<Agent />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<PageNotFound />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="ad/create" element={<AdCreate />} />
              <Route path="ad/create/rent/House" element={<RentHouse />} />
              <Route path="ad/create/rent/Land" element={<RentLand />} />
              <Route path="ad/create/sell/House" element={<SellHouse />} />
              <Route path="ad/create/sell/Land" element={<SellLand />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/settings" element={<Settings />} />
              <Route path="user/wishlist" element={<Wishlist />} />
              <Route path="user/enqiries" element={<Enquiries />} />
              <Route path="user/edit-ad/:slug" element={<AdEdit />} />
            </Route>
          </Routes>
          <Footer />
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
