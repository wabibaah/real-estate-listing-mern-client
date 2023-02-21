import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = { email };
      const { data } = await axios.post("/auth/forgot-password", config);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success(`Please check ${email} for the link to reset your password`);
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-center mb-5">Forgot Password</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter email to receive password reset link"
                className="form-control mb-4"
                required
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button disabled={loading} type="submit" className="btn btn-primary col-12 mb-4">
                {loading ? "Waiting..." : "Submit"}
              </button>
            </form>
            <Link className="text-danger" to="/login">
              Login instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
