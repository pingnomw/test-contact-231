import { TextField } from "@mui/material";
import { ContactProp } from "../contactUtils";

export default function EditContact(props: ContactProp){

  return (
    <div>
      <TextField variant="outlined" id="name" name="name" />
    </div>
  )
}