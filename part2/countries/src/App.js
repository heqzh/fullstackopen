import axios from "axios";
// Component
import { Countries } from "./components/Countries";
// Hook
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleInput = (e) => {
    if (!countries.length) return;
    let searchTerm = e.target.value.toLowerCase();
    // If searchbar is empty, set searchResults to an empty array
    if (!searchTerm.length) {
      return setSearchResults([]);
    }
    // Otherwise setSearchResults to all countries matching the search term
    let result = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchTerm);
    });
    setSearchResults(result);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <>
      <div>
        find countries <input onChange={handleInput} />
      </div>
      <Countries
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    </>
  );
}

export default App;
