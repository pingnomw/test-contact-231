import { checkPhoto, Contact, FullNameConfig, getFullName } from "../contactUtils";

export default function Detail(props: Contact){
    const fullName = getFullName(props, FullNameConfig.FIRST_LAST)

    return (
        <div>
            <h1>{fullName}</h1>
            <h2>Age: {props.age}</h2>
            {checkPhoto(props) ?
                <img src={props.photo} alt={"Profile picture of " + fullName} />
            : null}
        </div>
    )
}