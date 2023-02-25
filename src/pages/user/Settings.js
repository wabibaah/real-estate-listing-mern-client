import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Sidebar from "../../components/nav/Sidebar";

function Settings() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-password", {
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Password Updated");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Password updating failed");
    }
  };

  return (
    <div className="container-fluid">
      <Sidebar />
      <div className="container mt-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-2">
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter new password"
                  className="form-control mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary col-12 mb-4" disabled={loading}>
                  {loading ? "Processing" : "Update password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
