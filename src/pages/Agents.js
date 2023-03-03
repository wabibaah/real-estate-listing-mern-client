import { useEffect, useState } from "react";
import axios from "axios";

import UserCard from "../components/cards/UserCard";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get("/auth/agents");
      setAgents(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Agents</h1>
      <div className="container">
        <div className="row">
          {agents?.map((agent) => (
            <UserCard user={agent} key={agent._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Agents;
