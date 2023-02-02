import React from "react"

const NO_PHOTO = "N/A"
export const DIGITS_ONLY_REGEX = /^\d+$/
const PHOTO_URL_REGEX = /^(?:https?|ftp|file):\/\//

export interface Contact {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    photo: string, // URL
}

// like Contact, but there is no ID
export interface Contact_noId {
    firstName: string,
    lastName: string,
    age: number,
    photo: string,
}

// like Contact_noId, but everything is a string because HTML input elements always contain string
export interface Contact_str {
    firstName: string,
    lastName: string,
    age: string,
    photo: string,
}

export const emptyContact = {
    id: "",
    firstName: "",
    lastName: "",
    age: 0,
    photo: "",
} as const

export const emptyContactStr = {
    ...emptyContact,
    age: "",
} as const

// converts Contact_noId to Contact_str
export function contactNoId2str(contact: Contact_noId) {
    return { ...contact, age: String(contact.age)} as Contact_str
}

// converts Contact_str to Contact_noId
// CAUTION -- age should be verified first otherwise it could return NaN or Infinity
export function str2contactNoId(contactStr: Contact_str) {
    return { ...contactStr, age: Number(contactStr.age)} as Contact_noId
}

// the above but with checking
export function prepareContact(contactStr: Contact_str) {
    const out = str2contactNoId(contactStr)
    if (!checkPhoto(out)){
        out.photo = NO_PHOTO
    }
    if (!isFinite(out.age)){ // if age is infinity, NaN, or undefined
        out.age = 0
    }
    return out
}

export interface ContactProp {
    contact: Contact | null,
    children?: JSX.Element | React.Component
}
export interface ContactsListProp {
    contacts: Contact[],
    children?: JSX.Element | React.Component
}

export enum FullNameConfig {
    FIRST_LAST,       // John Smith
    LAST_COMMA_FIRST, // Smith, John
    LAST_FIRST,       // Smith John (useful for East Asian names)
}

export function getFullName(contact: Contact, config?: FullNameConfig){
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

export function checkPhoto<T extends {photo: string}>(contact: T){
    return PHOTO_URL_REGEX.test(contact.photo)
}
