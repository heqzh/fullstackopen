import React from "react";
import { useState } from "react";

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
      if (isDuplicate) return alert(`${newName} is already added to phonebook`);

      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: Date.now() },
      ]);
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
