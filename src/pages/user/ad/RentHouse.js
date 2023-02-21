import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

function RentHouse() {
  return (
    <div>
      <Sidebar />
      <h1>Rent House</h1>
      <div className="container mt-2">
        <AdForm action="Rent" type="House" />
      </div>
    </div>
  );
}

export default RentHouse;
