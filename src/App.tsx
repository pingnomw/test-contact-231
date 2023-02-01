import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import ContactDetail from './components/detail';
import ContactsList from './components/list';
import { Contact } from './contactUtils';
import { deselectContact, getSelectedContact } from './features/contacts/contactsSlice';
import { populateContacts } from './httpUtils';

function App() {
  const [contactsList, setContactsList] = useState<Contact[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const selected = useAppSelector(getSelectedContact)
  const dispatch = useAppDispatch()

  const isMobile = (window.innerWidth <= 600)

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
      <ContactsList contacts={contactsList}/>
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={selected != null}
        onClose={() => dispatch(deselectContact())}
      >
        <ContactDetail contact={selected} />
      </Drawer>
    </div>
  );
}

export default App;
