import { Avatar, Typography } from "@mui/material";
import { checkPhoto, ContactProp, emptyContact, FullNameConfig, getFullName } from "../contactUtils";
import detailStyles from "./detailStyles";

export default function ContactDetail(props: ContactProp){
  const contactInfo = props.contact ?? emptyContact
  const fullName = getFullName(contactInfo, FullNameConfig.FIRST_LAST)

  return (
    <div style={{
      padding: 10,
      verticalAlign: "top",
    }}>

      {props.contact == null
      ?
        <Typography sx={detailStyles.detail}>Select a contact to show information.</Typography>
      :
        <>
          {checkPhoto(contactInfo) ?
            <Avatar src={contactInfo.photo} alt={fullName} sx={detailStyles.avatar} />
          : null}

          <div style={detailStyles.textContainer}>
            <Typography sx={detailStyles.name}>{fullName}</Typography>
            {(contactInfo.age >= 0) ?
              <Typography sx={detailStyles.detail}>Age: {contactInfo.age}</Typography>
            : null}
          </div>
        </>
      }

      

    </div>
  )
}