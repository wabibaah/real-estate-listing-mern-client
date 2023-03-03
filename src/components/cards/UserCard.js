import { useEffect, useState } from "react";
import { Badge } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../img/logo512.png";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

function UserCard({ user }) {
  const [count, setCount] = useState(0);
  const agentId = user?._id; // matching what is in the route at the backend

  useEffect(() => {
    if (agentId) {
      fetchAdCount();
    }
  }, [agentId]);

  const fetchAdCount = async () => {
    try {
      const { data } = await axios.get(`/auth/agent-ad-count/${agentId}`);
      setCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <Link to={`/agent/${user.username}`}>
        <Badge.Ribbon text={`${count} listings`}>
          <div className="card hoverable shadow">
            <img
              src={user?.photo?.Location ?? Logo}
              alt={user.username}
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h3>{user?.username ?? user.name}</h3>
              {/* you can show the address only too or select some if your app is finally working with aws and google */}
              <p className="card-text">Joined {dayjs(user.createdAt).fromNow()}</p>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}

export default UserCard;
// go to pixabay and search for business men
