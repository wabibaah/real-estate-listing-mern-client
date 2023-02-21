import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";

function AdForm({ action, type }) {
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landSize: "",
    type: "",
    title: "",
    description: "",
    loading: false,
  });
  console.log(ad);
  return (
    <>
      <div className="mb-3 form-control">
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions="gh"
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "Search for address",
            onchange: ({ value }) => {
              setAd({ ...ad, address: value.description });
            },
          }}
        />
      </div>
      <CurrencyInput
        placeholder="Enter price"
        defaultValue={ad.price}
        className="form-control mb-3"
        onValueChange={(value) => setAd({ ...ad, price: value })}
      />
      <input
        type="number"
        min="0"
        className="form-control mb-3 "
        placeholder="Enter how many bedrooms"
        value={ad.bedrooms}
        onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
      />

      <input
        type="number"
        min="0"
        className="form-control mb-3 "
        placeholder="Enter how many bathrooms"
        value={ad.bathrooms}
        onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
      />

      <input
        type="number"
        min="0"
        className="form-control mb-3 "
        placeholder="Enter how many carparks"
        value={ad.carpark}
        onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
      />

      <input
        type="text"
        className="form-control mb-3 "
        placeholder="Size of Land"
        value={ad.landSize}
        onChange={(e) => setAd({ ...ad, landSize: e.target.value })}
      />

      <input
        type="text"
        className="form-control mb-3 "
        placeholder="Enter title"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />

      <textarea
        cols="30"
        rows="10"
        className="form-control"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
        placeholder="Enter description"
      ></textarea>

      <button className="btn btn-primary">Submit</button>
    </>
  );
}

export default AdForm;
