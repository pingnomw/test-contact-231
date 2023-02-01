import { checkPhoto, ContactProp, emptyContact, FullNameConfig, getFullName } from "../contactUtils";


export default function ContactDetail(props: ContactProp){
    const contactInfo = props.contact ?? emptyContact
    const fullName = getFullName(contactInfo, FullNameConfig.FIRST_LAST)

    return (
        <div>
            <h1>{fullName}</h1>
            {(contactInfo.age >= 0) ? <h2>Age: {contactInfo.age}</h2> : null}
            {checkPhoto(contactInfo) ?
                <img src={contactInfo.photo} alt={"Profile picture of " + fullName} />
            : null}
        </div>
    )
}