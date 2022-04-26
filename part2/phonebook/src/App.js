import { useState, useEffect } from "react";
// Component
import { Notification } from "./components/Notification";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
// Service
import phonebookServices from "./services/phonebookServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState();

  // Get all phone numbers from the server
  useEffect(() => {
    phonebookServices.read().then((allNumbers) => setPersons(allNumbers));
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter persons={persons} setPersons={setPersons} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
