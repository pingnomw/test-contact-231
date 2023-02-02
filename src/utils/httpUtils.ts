import axios from "axios";
import { API_ENDPOINT } from "./constants";
import { Contact, Contact_noId } from "./contactUtils";

export interface ResponseBody {
    message: string,
    data: Contact[]
}

export async function populateContacts(){ // get all contacts
    const res = await axios.get<ResponseBody>(API_ENDPOINT)
    console.log(res.data)
    if (res.status < 400){
        return res.data.data
    } else {
        console.log(res)
        return []
    }
}

export async function createNewContact(contact: Contact_noId) {
    return await axios.post(API_ENDPOINT, contact)
}

export async function modifyContact(id: string, contact: Contact_noId) {
    return await axios.put(API_ENDPOINT + "/" + id, contact)
}

export async function deleteContact(id: string) {
    return await axios.delete(API_ENDPOINT + "/" + id)
}
