import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";

function AdFeatures({ ad }) {
  return (
    <>
      <p className="card-text d-flex justify-content-between ">
        {ad?.bedrooms ? (
          <span>
            <IoBedOutline /> {ad.bedrooms}
          </span>
        ) : (
          ""
        )}
        {ad?.bathrooms ? (
          <span>
            <TbBath /> {ad.bathrooms}
          </span>
        ) : (
          ""
        )}
        {ad?.landSize ? (
          <span>
            <BiArea /> {ad.landSize}
          </span>
        ) : (
          ""
        )}
      </p>
    </>
  );
}

export default AdFeatures;
