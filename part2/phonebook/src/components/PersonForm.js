import React, { useState } from "react";
import phonebookServices from "../services/phonebookServices";

export const PersonForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const showNotification = (message, success) => {
    setNotification({ message, success });
    setTimeout(() => {
      setNotification();
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let lowerCaseName = newName.toLowerCase();
    // Find the person's entry
    let findPerson = persons.find(
      (person) => person.name.toLowerCase() === lowerCaseName
    );
    if (findPerson) {
      let update = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (!update) return;
      // Update the found person's phone number
      let updatedPerson = { ...findPerson, number: newNumber };
      // PUT request the updated entry to the backend
      phonebookServices
        .update(findPerson.id, updatedPerson)
        .then((updatedEntry) => {
          // Returns a response of the updated entry
          setPersons(
            persons.map((person) =>
              person.id !== updatedEntry.id ? person : updatedEntry
            )
          );
          showNotification(
            `Updated ${updatedEntry.name}'s number to ${updatedEntry.number}`,
            true
          );
        })
        .catch((error) => {
          showNotification(error.response.data.message, false);
        });
    }
    // If the person does not exist, create a new entry
    else {
      // POST request the new person's entry to the backend
      phonebookServices
        .create({ name: newName, number: newNumber })
        .then((newEntry) => {
          setPersons(persons.concat(newEntry));
          showNotification(`Added ${newEntry.name}`, true);
        })
        .catch((error) => {
          showNotification(error.response.data.message, false);
        });
    }
    setNewName("");
    setNewNumber("");
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
