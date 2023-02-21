import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

function RentLand() {
  return (
    <div>
      <Sidebar />
      <h1>Rent Land</h1>
      <div className="container mt-2">
        <AdForm action="Rent" type="Land" />
      </div>
    </div>
  );
}

export default RentLand;
