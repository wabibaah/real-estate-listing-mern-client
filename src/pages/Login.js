import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = { email, password };
      const { data } = await axios.post("/auth/login", config);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        toast.success("Successfully logged in as a user");
        setLoading(false);
        // navigate("/"); // look at other websites and create a special for this , i don't think the home page is good enough
        location?.state !== null ? navigate(location.state) : navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-center mb-5">Login</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control mb-4"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button disabled={loading} type="submit" className="btn btn-primary col-12 mb-4">
                {loading ? "Waiting..." : "Login"}
              </button>
            </form>
            <Link className="text-danger" to="/auth/forgot-password">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
