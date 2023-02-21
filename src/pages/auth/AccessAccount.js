import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import { useAuth } from "../../context/auth";

function AccessAccount() {
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const resetCode = params.resetCode;
  const navigate = useNavigate();
  useEffect(() => {
    if (resetCode) requestAccess();
  }, [resetCode]);

  const requestAccess = async () => {
    try {
      const config = { resetCode };
      const { data } = await axios.post("/auth/access-account", config);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        toast.success("Please update your password in your profile page");
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

export default AccessAccount;
