import { Avatar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkPhoto, ContactProp, emptyContact, FullNameConfig, getFullName } from "../utils/contactUtils";
import detailStyles from "./detailStyles";
import { Edit } from '@mui/icons-material';

export default function ContactDetail(props: ContactProp){
  const contactInfo = props.contact ?? emptyContact
  const fullName = getFullName(contactInfo, FullNameConfig.FIRST_LAST)
  const navigate = useNavigate()

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

          <div>
            <Button variant="outlined" onClick={() => navigate("/edit")}>
              <Edit />
              Edit
            </Button>
          </div>
        </>
      }

      

    </div>
  )
}