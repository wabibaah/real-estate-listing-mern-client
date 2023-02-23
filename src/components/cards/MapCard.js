import GoogleMapReact from "google-map-react";
import { GOOGLE_MAPS_KEY } from "../../config";

function MapCard({ ad }) {
  const defaultProps = {
    center: {
      lng: ad?.location?.coordinates[0],
      lat: ad?.location?.coordinates[1],
    },
    zoom: 11,
  };
  if (ad?.location?.coordinates?.length) {
    return (
      <div className="" style={{ width: "100%", height: "350px" }}>
        <GoogleMapReact
          bootsrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <div
            className=""
            lat={ad?.location?.coordinates[1]}
            lng={ad?.location?.coordinates[0]}
          ></div>
          <span className="lead">he did push pin emoji here</span>
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapCard;
