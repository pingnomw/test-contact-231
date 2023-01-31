import { ContactsListProp, getFullName } from "../contactUtils";

export default function List(props: ContactsListProp){
    const contactsList = props.contacts

    return (
        <div>
            {contactsList.map((contact) => {return (
                <div key={contact.id}>
                    <button>{getFullName(contact)}</button>
                </div>
            )})}
        </div>
    )
}