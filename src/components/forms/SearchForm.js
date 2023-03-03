import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSearch } from "../../context/search";
import { GOOGLE_PLACES_KEY } from "../../config";
import { sellPrices, rentPrices } from "../../helpers/priceList";

function SearchForm() {
  const [search, setSearch] = useSearch();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearch({ ...search, loading: true });
    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);

      const { data } = await axios.get(`/ad/search?${query}`);

      if (search?.page !== "/search") {
        setSearch((prev) => ({
          ...prev,
          results: data,
          loading: false,
        }));
        navigate("/search");
      } else {
        setSearch((prev) => ({
          ...prev,
          results: data,
          page: window.location.pathname,
          loading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

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
            <button
              onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
              className="btn btn-primary col-lg-2"
            >
              {search.action === "Buy" ? "✅ Buy" : "Buy"}
            </button>
            <button
              onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
              className="btn btn-primary col-lg-2 btn-radius-0"
            >
              {search.action === "Rent" ? "✅ Rent" : "Rent"}
            </button>
            <button
              onClick={() => setSearch({ ...search, type: "House", price: "" })}
              className="btn btn-primary col-lg-2 btn-radius-0"
            >
              {search.type === "House" ? "✅ House" : "House"}
            </button>
            <button
              onClick={() => setSearch({ ...search, type: "Land", price: "" })}
              className="btn btn-primary col-lg-2 btn-radius-0"
            >
              {search.type === "Land" ? "✅ Land" : "Land"}
            </button>
            <div className="dropdown ">
              <button
                className="btn btn-primary btn-radius-0 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => setDropdown(!dropdown)}
              >
                &nbsp; {search?.price ? search.price : "Price"}
              </button>
              {search.action === "Buy" ? (
                <ul className={`dropdown-menu ${dropdown && "show"}`}>
                  {sellPrices.map((sellPrice) => (
                    <li key={sellPrice.id}>
                      <a
                        onClick={() => {
                          setSearch({
                            ...search,
                            price: sellPrice.name,
                            priceRange: sellPrice.array,
                          });
                        }}
                        className="dropdown-item"
                      >
                        {sellPrice.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className={`dropdown-menu ${dropdown && "show"}`}>
                  {rentPrices.map((rentPrice) => (
                    <li key={rentPrice.id}>
                      <a
                        onClick={() => {
                          setSearch({
                            ...search,
                            price: rentPrice.name,
                            priceRange: rentPrice.array,
                          });
                        }}
                        className="dropdown-item"
                      >
                        {rentPrice.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button onClick={handleSearch} className="btn btn-danger col-lg-2 btn-radius-0">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchForm;

// this is what morgan gave me
// OPTIONS /api/search?action=Buy&address=&loading=false&priceRange=500000&priceRange=1000000&prie=&type=Land 204 1.464 ms - 0
// GET /api/search?action=Buy&address=&loading=false&priceRange=500000&priceRange=1000000&prie=&type=Land 404 2.519 ms - 149
