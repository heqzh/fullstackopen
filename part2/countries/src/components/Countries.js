import React from "react";
// Component
import { Country } from "./Country";

export const Countries = ({ searchResults, setSearchResults }) => {
  const handleShow = (country) => {
    return setSearchResults([country]);
  };

  if (searchResults.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (searchResults.length > 1) {
    return searchResults.map((country, index) => (
      <div key={index}>
        {country.name.common}{" "}
        <button onClick={() => handleShow(country)}>show</button>
      </div>
    ));
  } else if (searchResults.length === 1) {
    let [country] = searchResults;
    return <Country country={country} />;
  } else return;
};
