import { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";
import UserAdCard from "../../components/cards/UserAdCard";

function Dashboard() {
  const [auth, setAuth] = useAuth();

  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const seller = auth.user?.role?.includes("Seller");

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/ad/get-user-ads/${page}`);
      setAds(data.ads);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      // i was thinking we should give this one to the body but he intentionally gave it to the params as the backend is receiving it ,,,, sharp sharp sharp
      const { data } = await axios.get(`/ad/get-user-ads/${page}`);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Sidebar />
      {!seller ? (
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-20%" }}
        >
          <h2>Hey, {auth.user.name ? auth.user.name : auth.user.username}, welcome to Wabi app</h2>
        </div>
      ) : (
        <div className="container ">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 my-4">
              <h3 className="text-center">Total {total} found</h3>
            </div>
          </div>
          <div className="row">
            {ads?.map((ad) => (
              <UserAdCard ad={ad} key={ad._id} />
            ))}
          </div>
          {ads?.length < total ? (
            <div className="row">
              <div className="col text-center my-4">
                <button
                  className="btn btn-warning"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Processing" : `${ads?.length} / ${total} Load more`}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
