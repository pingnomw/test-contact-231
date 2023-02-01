import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { ContactsListProp, getFullName } from "../contactUtils";
import { selectContact } from "../features/contacts/contactsSlice";

export default function ContactsList(props: ContactsListProp){
  const contactsList = props.contacts
  const dispatch = useAppDispatch()

  return (
    <List>
      {contactsList.map((contact) => {return (
        <ListItem key={contact.id}>
          <ListItemButton onClick={() => dispatch(selectContact(contact))}>
            <ListItemAvatar>
              <Avatar src={contact.photo} alt={getFullName(contact)} />
            </ListItemAvatar>
            <ListItemText primary={getFullName(contact)} />
          </ListItemButton>
        </ListItem>
      )})}
    </List>
  )
}