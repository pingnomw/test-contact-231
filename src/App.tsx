import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './app/hooks';
import EditContact from './components/edit';
import Homepage from './components/home';
import { Contact } from './utils/contactUtils';
import { getSelectedContact } from './features/contacts/contactsSlice';
import { populateContacts } from './utils/httpUtils';

function App() {
  const [contactsList, setContactsList] = useState<Contact[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const selected = useAppSelector(getSelectedContact)

  async function get(){
    try {
      setLoading(true)
      const list = await populateContacts()
      setContactsList(list)
    } catch (err) {
      const error = err as Error
      console.log(err)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    get()
  }, [])
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage contacts={contactsList} />} />
        <Route path='/edit/*' element={<EditContact contact={selected} />} />
      </Routes>
    </div>
  );
}

export default App;
