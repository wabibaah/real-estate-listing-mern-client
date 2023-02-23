import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";

function AdForm({ action, type }) {
  const navigate = useNavigate();
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landSize: "",
    type,
    action,
    title: "",
    description: "",
    loading: false,
  });
  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("/ad/create", ad);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      } else {
        toast.success("Ad created successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="mb-3 form-control">
        <ImageUpload ad={ad} setAd={setAd} />
      </div>
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
      {type === "House" ? (
        <>
          <input
            type="number"
            min="0"
            className="form-control mb-3 "
            placeholder="Enter number bedrooms"
            value={ad.bedrooms}
            onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
          />

          <input
            type="number"
            min="0"
            className="form-control mb-3 "
            placeholder="Enter number bathrooms"
            value={ad.bathrooms}
            onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
          />

          <input
            type="number"
            min="0"
            className="form-control mb-3 "
            placeholder="Enter number carparks"
            value={ad.carpark}
            onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
          />
        </>
      ) : (
        ""
      )}

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

      <button onClick={handleClick} className="btn btn-primary mb-5" disabled={ad.loading}>
        {ad.loading ? "Saving" : "Submit"}
      </button>
    </>
  );
}

export default AdForm;
