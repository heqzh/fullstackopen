import React from "react";
import phonebookServices from "../services/phonebookServices";

export const Filter = ({ persons, setPersons }) => {
  const handleFilter = (e) => {
    let searchTarget = e.target.value;
    // If filter search is empty
    if (!searchTarget.length) {
      // Reset to showing all the numbers
      phonebookServices.read().then((allNumbers) => setPersons(allNumbers));
      return;
    }
    let matches = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTarget)
    );
    if (matches.length) {
      setPersons(matches);
    }
  };

  return (
    <div>
      filter shown with <input onChange={handleFilter} />
    </div>
  );
};
