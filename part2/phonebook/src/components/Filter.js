import React from "react";

export const Filter = ({ persons, setPersons }) => {
  const handleFilter = (e) => {
    let filter = e.target.value;
    let matches = persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
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
