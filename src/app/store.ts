import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsSlice from '../features/contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
