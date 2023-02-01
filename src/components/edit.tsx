import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { checkPhoto, ContactProp, emptyContact } from "../contactUtils";
import editStyles from "./editStyles";

export default function EditContact(props: ContactProp){
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState<boolean>(false)

  const contactInfo = props.contact ?? emptyContact
  const {id, age, ..._contactValues} = contactInfo
  const contactValues = {..._contactValues, age: String(age)}

  const formik = useFormik({
    initialValues: contactValues,
    onSubmit: async (values) => {
      const preparedValues = {...values, age: Number(values.age)}
      console.log(preparedValues)

      try {
        setLoading(true)

        if (!checkPhoto(preparedValues)){
          preparedValues.photo = "N/A"
        }

        if (id){ // editing an existing contact
          await axios.put(API_ENDPOINT + "/" + id, values)
        } else { // creating a new contact
          await axios.post(API_ENDPOINT, values)
        }
        setLoading(false)
        navigate(-1)

      } catch (err) {
        setLoading(false)
        const error = err as Error
        console.log(err)
        alert(error.message)
      }
    }
  })

  return (
    <div style={{
      width: 300
    }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="firstName" name="firstName" label="First Name"
          value={formik.values.firstName} onChange={formik.handleChange}
        />
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="lastName" name="lastName" label="Last Name"
          value={formik.values.lastName} onChange={formik.handleChange}
        />
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="age" name="age" label="Age" type="number"
          value={formik.values.age} onChange={formik.handleChange}
        />
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="photo" name="photo" label="Photo URL (optional)"
          value={formik.values.photo} onChange={formik.handleChange}
        />
        <Button variant="contained" type="submit" disabled={isLoading}>Save</Button>
        <Button onClick={() => navigate(-1)} disabled={isLoading}>Cancel</Button>
      </form>
    </div>
  )
}