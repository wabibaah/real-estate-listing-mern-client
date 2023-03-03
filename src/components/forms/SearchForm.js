import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { useSearch } from "../../context/search";
import ImageUpload from "./ImageUpload";
import { GOOGLE_PLACES_KEY } from "../../config";

function SearchForm() {
  const [search, setSearch] = useSearch();
  return (
    <>
      <div className="container m-5">
        <div className="row">
          <div className="col-lg-12 form-control">
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions="gh"
              selectProps={{
                defaultInputValue: search?.address,
                placeholder: "Search for address",
                onchange: ({ value }) => {
                  setSearch({ ...search, address: value.description });
                },
              }}
            />
          </div>
          <div className="d-flex mt-3 justify-content-center">
            <button className="btn btn-primary col-lg-2" style={{ borderRadius: "0px" }}>
              Buy
            </button>
            <button className="btn btn-primary col-lg-2 btn-radius-0">Rent</button>
            <button className="btn btn-primary col-lg-2 btn-radius-0">House</button>
            <button className="btn btn-primary col-lg-2 btn-radius-0">Land</button>
            <button className="btn btn-primary col-lg-2 btn-radius-0">Price</button>
            <button className="btn btn-danger col-lg-2 btn-radius-0">Search</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchForm;
