import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/Sidebar";

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
