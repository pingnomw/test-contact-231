import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { checkPhoto, ContactsListProp, getFullName } from "../contactUtils";

export default function ContactsList(props: ContactsListProp){
  const contactsList = props.contacts

  return (
    <List>
      {contactsList.map((contact) => {return (
        <ListItem key={contact.id}>
          <ListItemButton>
            {checkPhoto(contact) ?
              <ListItemAvatar>
                <Avatar src={contact.photo} alt="" />
              </ListItemAvatar>
            : null}
            <ListItemText primary={getFullName(contact)} />
          </ListItemButton>
        </ListItem>
      )})}
    </List>
  )
}