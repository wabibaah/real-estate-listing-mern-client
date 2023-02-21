import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/auth";

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

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <Main />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/account-activate/:token" element={<AccountActivate />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/access-account/:resetCode" element={<AccessAccount />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ad/create" element={<AdCreate />} />
            <Route path="ad/create/rent/House" element={<RentHouse />} />
            <Route path="ad/create/rent/Land" element={<RentLand />} />
            <Route path="ad/create/sell/House" element={<SellHouse />} />
            <Route path="ad/create/sell/Land" element={<SellLand />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
