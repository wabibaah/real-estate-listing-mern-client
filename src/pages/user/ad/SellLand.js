import Sidebar from "../../../components/nav/Sidebar";
import AdForm from "../../../components/forms/AdForm";

function SellLand() {
  return (
    <div>
      <Sidebar />
      <h1>Sell Land</h1>
      <div className="container mt-2">
        <AdForm action="Sell" type="Land" />
      </div>
    </div>
  );
}

export default SellLand;
