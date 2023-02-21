import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/nav/Sidebar";

function AdCreate() {
  const [sell, setSell] = useState(true);
  const [rent, setRent] = useState(false);

  const navigate = useNavigate();

  const handleSell = () => {
    setSell(true);
    setRent(false);
  };
  const handleRent = () => {
    setRent(true);
    setSell(false);
  };

  return (
    <div>
      <Sidebar />
      <h1>AdCreate</h1>
      <div
        className="d-flex justify-content-center align-items-center vh-100 gap-3"
        style={{ marginTop: "-14%" }}
      >
        <div className="col-lg-6">
          <button onClick={handleSell} className="btn btn-primary btn-lg col-12 p-5">
            <span className="h2 ">Sell</span>
          </button>
          {sell && (
            <div className="my-1 d-flex gap-3 justify-content-around">
              <button
                onClick={() => navigate("/ad/create/sell/House")}
                className="btn btn-secondary py-3 px-5"
              >
                House for sell
              </button>
              <button
                onClick={() => navigate("/ad/create/sell/Land")}
                className="btn btn-secondary py-3 px-5"
              >
                Land for sell
              </button>
            </div>
          )}
        </div>
        <div className="col-lg-6">
          <button onClick={handleRent} className="btn btn-secondary btn-lg col-12 p-5">
            <span className="h2 ">Rent</span>
          </button>
          {rent && (
            <div className="my-1 d-flex gap-3 justify-content-around">
              <button
                onClick={() => navigate("/ad/create/rent/House")}
                className="btn btn-secondary py-3 px-5"
              >
                House for rent
              </button>
              <button
                onClick={() => navigate("/ad/create/rent/Land")}
                className="btn btn-secondary py-3 px-5"
              >
                Land for rent
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdCreate;
