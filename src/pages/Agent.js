import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserCard from "../components/cards/UserCard";
import AdCard from "../components/cards/AdCard";

function Agent() {
  const params = useParams();
  const [agent, setAgent] = useState({});
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); // useEffect will run automatically not on button press or triggered

  useEffect(() => {
    if (params?.username) fetchAgent();
  }, [params?.username]);

  const fetchAgent = async () => {
    try {
      const { username } = params;
      const { data } = await axios.get(`/auth/agent/${username}`);
      setAgent(data.agent);
      setAds(data.ads);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 "
        style={{ marginTop: "-15%" }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="display-1 bg-primary text-light p-5">{agent?.name ?? agent?.username}</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 "></div>
          <UserCard user={agent} />
          <div className="col-lg-4 "></div>
        </div>
      </div>
      <h2 className="text-center m-5">Recent Listings</h2>
      <div className="container">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Agent;

// so i have an idea, if you want to start creating apps like this, first think about the pages and draw them down, and the components will start generating themselves one after the other, learn figma or an online tool if that be the case
