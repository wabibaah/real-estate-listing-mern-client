import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

function SellHouse() {
  return (
    <div>
      <Sidebar />
      <h1>Sell House</h1>
      <div className="container mt-2">
        <AdForm action="Sell" type="House" />
      </div>
    </div>
  );
}

export default SellHouse;
