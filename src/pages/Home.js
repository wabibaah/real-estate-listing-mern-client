import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/auth";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";

function Home() {
  const [auth, setAuth] = useAuth();
  const [adsForSell, setAdsForSell] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ad/get-ads");
      setAdsForRent(data.adsForRent);
      setAdsForSell(data.adsForSell);
    } catch (err) {}
  };

  return (
    <div>
      <SearchForm />
      <h1 className="display-1 bg-primary text-light p-5">For Sell</h1>
      <div className="container">
        <div className="row">
          {adsForSell?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>

      <h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
      <div className="container">
        <div className="row">
          {adsForRent?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

// so even in the home the auth setAuth is not used
