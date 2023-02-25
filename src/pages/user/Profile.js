import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import ProfileUpload from "../../components/forms/ProfileUpload";

function Profile() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (auth.user) {
      setUsername(auth.user?.username);
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setCompany(auth.user?.company);
      setAddress(auth.user?.address);
      setPhone(auth.user?.phone);
      setAbout(auth.user?.about);
      setPhoto(auth.user?.photo);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-profile", {
        username,
        name,
        company,
        address,
        phone,
        about,
        photo,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth({ ...auth, user: data });
        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);
        toast.success("Profile Updated");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Profile updating failed");
    }
  };

  return (
    <div className="container-fluid">
      <Sidebar />
      <div className="container mt-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-2">
              <ProfileUpload
                photo={photo}
                setPhoto={setPhoto}
                uploading={uploading}
                setUploading={setUploading}
              />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Update your username"
                  className="form-control mb-4"
                  value={username}
                  onChange={(e) => setUsername(slugify(e.target.value.toLowerCase()))}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your name"
                  className="form-control mb-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name=""
                  id=""
                  className="form-control mb-4"
                  value={email}
                  disabled={true}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your company name"
                  className="form-control mb-4"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your address"
                  className="form-control mb-4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your phone number"
                  className="form-control mb-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="form-control mb-4"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  maxLength={200}
                  placeholder="Write something interesting about yourself"
                ></textarea>
                <button type="submit" className="btn btn-primary col-12 mb-4" disabled={loading}>
                  {loading ? "Processing" : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
