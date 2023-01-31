export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    photo: string, // URL
}

export enum FullNameConfig {
    FIRST_LAST,       // John Smith
    LAST_COMMA_FIRST, // Smith, John
    LAST_FIRST,       // Smith John (useful for East Asian names)
}

export function getFullName(contact: Contact, config: FullNameConfig){
    let out: string

    // if any part of the name is missing, return whatever is not
    if (contact.firstName.length === 0 || contact.lastName.length === 0){
        out = contact.firstName + contact.lastName
    } else { // otherwise, follow config
        switch (config){
            case FullNameConfig.LAST_COMMA_FIRST:
                out = contact.lastName + ", " + contact.firstName
                break
            case FullNameConfig.LAST_FIRST:
                out = contact.lastName + " " + contact.firstName
                break
            default:
                out = contact.firstName + " " + contact.lastName
        }
    }

    return out.trim()
}

const PHOTO_URL_REGEX = /^(?:https?|ftp|file):\/\//
export function checkPhoto(contact: Contact){
    return PHOTO_URL_REGEX.test(contact.photo)
}