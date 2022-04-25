import { useState, useEffect } from "react";
// Component
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import phonebookServices from "./services/phonebookServices";

const App = () => {
  const [persons, setPersons] = useState([]);

  // Get all phone numbers from the server
  useEffect(() => {
    phonebookServices.read().then((allNumbers) => setPersons(allNumbers));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
