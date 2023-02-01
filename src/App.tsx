import { Drawer } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
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
  const [isMobileView, setMobileView] = useState<boolean>(window.innerWidth <= 600)

  const selected = useAppSelector(getSelectedContact)
  const dispatch = useAppDispatch()

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

  // auto update isMobileView on resize
  useLayoutEffect(() => {
    function updateSize() {
      setMobileView(window.innerWidth <= 600)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, []);

  return (
    <div className="App">
      <div style={{
        height: "100%",
        width: isMobileView ? "100%" : "45%",
        display: isMobileView ? "block" : "inline-block",
        verticalAlign: "top",
        textAlign: "start"
      }}>
        <ContactsList contacts={contactsList}/>
      </div>
      
      {isMobileView
      ?
        <Drawer
          anchor="bottom"
          open={selected != null}
          onClose={() => dispatch(deselectContact())}
        >
          <ContactDetail contact={selected} />
        </Drawer>
      :
        <div style={{
          display: "inline-block",
          width: "45%",
          verticalAlign: "top",
          textAlign: "start",
        }}>
          <ContactDetail contact={selected} />
        </div>
      }
    </div>
  );
}

export default App;
