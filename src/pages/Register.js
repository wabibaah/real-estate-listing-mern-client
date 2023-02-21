import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = { email, password };
      const { data } = await axios.post("/auth/pre-register", config);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Check your email to continue registration");
        setLoading(false);
        navigate("/"); // look at other websites and create a special for this , i don't think the home page is good enough
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-center mb-5">Register</h1>
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
                {loading ? "Waiting..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
