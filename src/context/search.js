import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const initialState = {
  address: "",
  action: "Rent",
  type: "House",
  prie: "",
  priceRange: [0, 1000000],
  results: [],
  page: "",
  loading: false,
};

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(initialState);

  return (
    <SearchContext.Provider value={[search, setSearch, initialState]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
