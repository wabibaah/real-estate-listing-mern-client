import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import { useAuth } from "../../context/auth";

function AccountActivate() {
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const token = params.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (token) requestActivation();
  }, [token]);

  const requestActivation = async () => {
    try {
      const config = { token };
      const { data } = await axios.post("/auth/register", config);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        toast.success("Successfully registered, welcome to wabi real estate listing");
        navigate("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div>
      <h3 className="display-1 d-flex justify-content-center align-items-center vh-100">
        Please wait whiles your account registration continues...
      </h3>
    </div>
  );
}

export default AccountActivate;
