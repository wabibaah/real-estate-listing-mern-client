import { useEffect, useState } from "react";
import axios from "axios";

import SearchForm from "../components/forms/SearchForm";

function Search() {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Search</h1>
      <SearchForm />
    </div>
  );
}

export default Search;

// so even in the home the auth setAuth is not used
