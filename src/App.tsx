import { useEffect, useState } from 'react';
import './App.css';
import List from './components/list';
import { Contact } from './contactUtils';
import { populateContacts } from './httpUtils';

function App() {
  const [contactsList, setContactsList] = useState<Contact[]>([])

  useEffect(() => {
    populateContacts().then(list => {
      setContactsList(list)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      <List contacts={contactsList}/>
    </div>
  );
}

export default App;
