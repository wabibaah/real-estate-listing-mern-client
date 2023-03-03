import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectRoute() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 1 && navigate("/");
    // clean up
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-15%" }}
    >
      <h2>Please Login. Redirecting in {count} seconds</h2>
    </div>
  );
}

export default RedirectRoute;
