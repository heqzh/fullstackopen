import React, { useState } from "react";
import phonebookServices from "../services/phonebookServices";

export const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.length && newNumber.length) {
      let lowerCaseName = newName.toLowerCase();
      let isDuplicate = persons.some(
        (person) => person.name.toLowerCase() === lowerCaseName
      );
      if (isDuplicate) {
        let update = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        );
        if (!update) return;
        // Find the person's id
        let match = persons.find(
          (person) => person.name.toLowerCase() === lowerCaseName
        );
        let updatedPerson = { ...match, number: newNumber };
        // PUT request an updated entry to the backend
        phonebookServices
          .update(match.id, updatedPerson)
          .then((updatedEntry) => {
            // Returns a response of the updated entry object
            // Update the frontend
            setPersons(
              persons.map((person) =>
                person.id !== updatedEntry.id ? person : updatedEntry
              )
            );
          });
      } else {
        // POST request a new number to the backend
        phonebookServices
          .create({ name: newName, number: newNumber, id: Date.now() })
          .then((newEntry) => setPersons(persons.concat(newEntry)));
      }
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameInput} />
        <div></div>
        number: <input value={newNumber} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
