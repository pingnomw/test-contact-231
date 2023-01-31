import axios from "axios";
import { API_ENDPOINT } from "./constants";
import { Contact } from "./contactUtils";

export interface ResponseBody {
    message: string,
    data: Contact[]
}

export async function populateContacts(){
    const res = await axios.get<ResponseBody>(API_ENDPOINT)
    if (res.status < 400){
        return res.data.data
    } else {
        console.log(res)
        return []
    }
}
