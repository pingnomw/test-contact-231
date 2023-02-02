import { FullNameConfig, getFullName, NO_PHOTO, prepareContact } from "./contactUtils"

const mockContact = {
        firstName: "Abc",
        lastName: "Def",
        age: "40",
        photo: "http://localhost:3000"
    }

test("should prepare contact (positive case)", () => {
    const preparedContact = prepareContact(mockContact)
    expect(preparedContact).toEqual({
        firstName: "Abc",
        lastName: "Def",
        age: 40,
        photo: "http://localhost:3000"
    })
})

test("should prepare contact (negative case)", () => {
    const preparedContact = prepareContact({
        firstName: "Abc",
        lastName: "Def",
        age: "n/a",
        photo: ""
    })
    expect(preparedContact).toEqual({
        firstName: "Abc",
        lastName: "Def",
        age: 0,
        photo: NO_PHOTO
    })
})

test("should get full name correctly (first last)", () => {
    const fullName = getFullName(mockContact)
    expect(fullName).toBe("Abc Def")
})

test("should get full name correctly (last, first)", () => {
    const fullName = getFullName(mockContact, FullNameConfig.LAST_COMMA_FIRST)
    expect(fullName).toBe("Def, Abc")
})

test("should get full name correctly (single name)", () => {
    const singleNameContact = {
        firstName: "Name",
        lastName: "",
        age: 0,
        photo: "N/A"
    }
    const fullName = getFullName(singleNameContact, FullNameConfig.LAST_COMMA_FIRST)
    expect(fullName).toBe("Name")
})
