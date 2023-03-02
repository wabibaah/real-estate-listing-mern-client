import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GOOGLE_PLACES_KEY } from "../../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import Sidebar from "../../../components/nav/Sidebar";

function AdEdit({ action, type }) {
  const navigate = useNavigate();
  const params = useParams();
  const [ad, setAd] = useState({
    _id: "",
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

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/get-ad/${params.slug}`);
      setAd(data?.ad);
      // setRelatedAd(data?.related);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    try {
      // validation
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      }
      if (!ad.price) {
        toast.error("Price is required");
        return;
      }
      if (!ad.description) {
        toast.error("Description is required");
        return;
      }
      if (!ad.description) {
        toast.error("Description is required");
        return;
      }
      if (!ad.description) {
        toast.error("Description is required");
        return;
      }
      setAd({ ...ad, loading: true });
      const adId = ad._id;
      const { data } = await axios.put(`/ad/edit/${adId}`, ad);
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

  const handleDelete = async () => {
    try {
      setAd({ ...ad, loading: true });
      const adId = ad._id;
      const { data } = await axios.delete(`/ad/delete/${adId}`);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad deleted successfully");
        setAd({ ...ad, loading: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="">Edit Ad</h1>
      <Sidebar />
      <div className="container">
        <div className="mb-3 form-control">
          <ImageUpload ad={ad} setAd={setAd} />
        </div>
        <div className="mb-3 form-control">
          {ad.address ? (
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
          ) : (
            ""
          )}
        </div>
        {ad.price ? (
          <CurrencyInput
            placeholder="Enter price"
            defaultValue={ad.price}
            className="form-control mb-3"
            onValueChange={(value) => setAd({ ...ad, price: value })}
          />
        ) : (
          ""
        )}

        {type === "House" ? (
          <>
            {ad.bedrooms ? (
              <input
                type="number"
                min="0"
                className="form-control mb-3 "
                placeholder="Enter number bedrooms"
                value={ad.bedrooms}
                onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
              />
            ) : (
              ""
            )}
            {ad.bathrooms ? (
              <input
                type="number"
                min="0"
                className="form-control mb-3 "
                placeholder="Enter number bathrooms"
                value={ad.bathrooms}
                onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
              />
            ) : (
              ""
            )}
            {ad.carpark ? (
              <input
                type="number"
                min="0"
                className="form-control mb-3 "
                placeholder="Enter number carparks"
                value={ad.carpark}
                onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
              />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {ad.landSize ? (
          <input
            type="text"
            className="form-control mb-3 "
            placeholder="Size of Land"
            value={ad.landSize}
            onChange={(e) => setAd({ ...ad, landSize: e.target.value })}
          />
        ) : (
          ""
        )}
        {ad.title ? (
          <input
            type="text"
            className="form-control mb-3 "
            placeholder="Enter title"
            value={ad.title}
            onChange={(e) => setAd({ ...ad, title: e.target.value })}
          />
        ) : (
          ""
        )}
        {ad.description ? (
          <textarea
            cols="30"
            rows="10"
            className="form-control"
            value={ad.description}
            onChange={(e) => setAd({ ...ad, description: e.target.value })}
            placeholder="Enter description"
          ></textarea>
        ) : (
          ""
        )}

        <div className="d-flex justify-content-between">
          <button onClick={handleClick} className="btn btn-primary mb-5" disabled={ad.loading}>
            {ad.loading ? "Saving..." : "Submit"}
          </button>
          <button onClick={handleDelete} className="btn btn-danger mb-5" disabled={ad.loading}>
            {ad.loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdEdit;

// he did it for some to be auto populated, you can do all as well bro
// i think i must set it up in search a way that when it is loaded, it will setState to pre populate all of these because i don't have internet and it is null
