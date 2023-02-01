import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Contact, FullNameConfig } from '../../contactUtils';

export interface ContactsState {
  selectedContact: Contact | null,
  displayOrder: FullNameConfig
}

const initialState: ContactsState = {
  selectedContact: null,
  displayOrder: FullNameConfig.FIRST_LAST
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<Contact>) => {
      state.selectedContact = action.payload
    },
    deselectContact: (state) => {
      state.selectedContact = null
    },
    setDisplayOrder: (state, action: PayloadAction<FullNameConfig>) => {
      state.displayOrder = action.payload
    },
  }
})

export const { selectContact, deselectContact, setDisplayOrder } = contactsSlice.actions

export function getSelectedContact (state: RootState) { return state.contacts.selectedContact }
export function getDisplayOrder (state: RootState) { return state.contacts.displayOrder }

export default contactsSlice.reducer;
