import React from "react";
import phonebookServices from "../services/phonebookServices";

export const Persons = ({ persons, setPersons }) => {
  const handleDelete = (person) => {
    // Confirm number deletion
    let confirm = window.confirm(`Delete ${person.name}?`);
    if (!confirm) return;
    phonebookServices.del(person.id);
    setPersons(persons.filter((p) => p.id !== person.id));
  };

  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </>
  );
};
