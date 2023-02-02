import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPhoto, contactNoId2str, ContactProp, DIGITS_ONLY_REGEX, emptyContact, prepareContact } from "../utils/contactUtils";
import { createNewContact, deleteContact, modifyContact } from "../utils/httpUtils";
import editStyles from "./editStyles";

export default function EditContact(props: ContactProp){
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState<boolean>(false)

  const contactInfo = props.contact ?? emptyContact
  const {id, ..._contactValues} = contactInfo
  const contactValues = contactNoId2str(_contactValues)

  const formik = useFormik({
    initialValues: contactValues,
    onSubmit: async (values) => {
      const preparedValues = prepareContact(values)
      console.log(preparedValues)

      try {
        setLoading(true)

        if (id){ // editing an existing contact
          modifyContact(id, preparedValues)
        } else { // creating a new contact
          createNewContact(preparedValues)
        }
        setLoading(false)
        navigate(-1)

      } catch (err) {
        setLoading(false)
        const error = err as Error
        console.log(err)
        alert(error.message)
      }
    },
    validate: (values) => {
      interface FormikErrors {
        firstName?: string,
        lastName?: string,
        age?: string,
        photo?: string,
      }
      const errors = {} as FormikErrors

      if (values.firstName.length === 0){
        errors.firstName = "First name is required"
      }
      if (values.lastName.length === 0){
        errors.lastName = "Last name is required"
      }
      if (!DIGITS_ONLY_REGEX.test(values.age)){
        errors.age = "Must be a number of 0 or greater"
      }
      if (values.photo.length > 0 && values.photo !== "N/A" && !checkPhoto(values)){
        errors.photo = "Photo URL must be a valid URL, the text \"N/A\", or blank"
      }

    }
  })

  async function deleteThisContact(id: string) {
    try {
      setLoading(true)
      await deleteContact(id)
      navigate(-1)
    } catch (err) {
      setLoading(false)
      const error = err as Error
      console.log(err)
      alert(error.message)
    }
  }

  return (
    <div style={{
      width: 300
    }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="firstName" name="firstName" label="First Name" required
          value={formik.values.firstName} onChange={formik.handleChange}
        />
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="lastName" name="lastName" label="Last Name" required
          value={formik.values.lastName} onChange={formik.handleChange}
        />
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="age" name="age" label="Age" type="number" required
          value={formik.values.age} onChange={formik.handleChange}
        />
        <TextField style={editStyles.textInput} fullWidth variant="outlined"
          id="photo" name="photo" label="Photo URL (optional)"
          value={formik.values.photo} onChange={formik.handleChange}
        />
        <Button style={editStyles.button} variant="contained" type="submit" disabled={isLoading}>
          Save
        </Button>
        <Button style={editStyles.button} variant="outlined" onClick={() => navigate(-1)} disabled={isLoading}>
          Cancel
        </Button>
        {(!!id) ? <div style={{padding: 10, width: "100%", textAlign: "center"}}>
          <Button style={{...editStyles.deleteButton, color: (isLoading ? "silver" : "red")}} onClick={() => deleteThisContact(id)} disabled={isLoading}>
            Delete
          </Button>
        </div> : null}
        
      </form>
    </div>
  )
}