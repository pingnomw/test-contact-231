import { checkPhoto, ContactProp, FullNameConfig, getFullName } from "../contactUtils";


export default function Detail(props: ContactProp){
    const contactInfo = props.contact
    const fullName = getFullName(contactInfo, FullNameConfig.FIRST_LAST)

    return (
        <div>
            <h1>{fullName}</h1>
            <h2>Age: {contactInfo.age}</h2>
            {checkPhoto(contactInfo) ?
                <img src={contactInfo.photo} alt={"Profile picture of " + fullName} />
            : null}
        </div>
    )
}