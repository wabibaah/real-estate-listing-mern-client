import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import RedirectRoute from "./RedirectRoute";

function PrivateRoute() {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/auth/current-user", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOk(true);
    } catch (err) {
      setOk(false);
    }
  };

  return ok ? <Outlet /> : <RedirectRoute />;
}

export default PrivateRoute;

//
// he said he can take the auth from the context or the local storage
// but he want to make request to the backend because that is more reliable
// he is making the request to the current user end point we created in the server side
