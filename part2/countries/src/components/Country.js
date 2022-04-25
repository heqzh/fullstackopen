import React from "react";
// Component
import { Weather } from "./Weather";

export const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <div>
        <h4>languages:</h4>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flag} />
      <h3>Weather in {country.capital}</h3>
      <Weather country={country} />
    </>
  );
};
