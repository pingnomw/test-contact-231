import { Button, Drawer } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import ContactDetail from '../components/detail';
import ContactsList from '../components/list';
import { ContactsListProp } from '../utils/contactUtils';
import { deselectContact, getSelectedContact } from '../features/contacts/contactsSlice';
import { Add } from '@mui/icons-material';

export default function Homepage(props: ContactsListProp){
  const contactsList = props.contacts
  const [isMobileView, setMobileView] = useState<boolean>(window.innerWidth <= 600)
  
  const selected = useAppSelector(getSelectedContact)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // auto update isMobileView on resize
  useLayoutEffect(() => {
    function updateSize() {
      setMobileView(window.innerWidth <= 600)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, []);

  return (<>
    <div style={{
      height: "100%",
      width: isMobileView ? "100%" : "45%",
      display: isMobileView ? "block" : "inline-block",
      verticalAlign: "top",
      textAlign: "start"
    }}>
      <Button
        variant='contained'
        sx={{margin: "8px 16px"}}
        onClick={() => {
          dispatch(deselectContact())
          navigate("/edit")
        }}
      >
        <Add />
        Create new contact
      </Button>
      <ContactsList contacts={contactsList}/>
    </div>
    
    {isMobileView
    ? // mobile view
      <Drawer
        anchor="bottom"
        open={selected != null}
        onClose={() => dispatch(deselectContact())}
      >
        <ContactDetail contact={selected} />
      </Drawer>

    : // desktop view
      <div style={{
        display: "inline-block",
        width: "45%",
        verticalAlign: "top",
        textAlign: "start",
      }}>
        <div style={{position: "fixed"}}>
          <ContactDetail contact={selected} />
        </div>
        
      </div>
    }
  </>)
}