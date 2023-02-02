import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import EditContact from './components/edit';
import Homepage from './components/home';
import { Contact, sortContactsList } from './utils/contactUtils';
import { getSelectedContact, getDisplayOrder, deselectContact } from './features/contacts/contactsSlice';
import { populateContacts } from './utils/httpUtils';

function App() {
  const [contactsList, setContactsList] = useState<Contact[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const selected = useAppSelector(getSelectedContact)
  const nameOrder = useAppSelector(getDisplayOrder)
  const location = useLocation()
  const dispatch = useAppDispatch()

  async function get(){
    try {
      setLoading(true)
      const list = (await populateContacts()).sort((a, b) => {return sortContactsList(a, b, nameOrder)})
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

  useEffect(() => {
    console.log(location)
    if (location.pathname === "/"){
      get()
      dispatch(deselectContact())
    }
  }, [location])
  
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
