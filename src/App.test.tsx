import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import userEvent from '@testing-library/user-event';
import { Contact_noId } from './utils/contactUtils';
import { BrowserRouter } from 'react-router-dom';
import { modifyContact, populateContacts } from './utils/httpUtils';


// mock httpUtils module
jest.mock("./utils/httpUtils", () => ({
  populateContacts: jest.fn(() => {return Promise.resolve([
    {
      id: "123",
      firstName: "Abc",
      lastName: "Def",
      age: 40,
      photo: "N/A"
    },
    {
      id: "456",
      firstName: "Ghi",
      lastName: "Jkl",
      age: 41,
      photo: "N/A"
    },
  ])}),
  
  createNewContact: jest.fn((_contact: Contact_noId) => {return Promise.resolve()}),
  modifyContact: jest.fn((_id: string, _contact: Contact_noId) => {return Promise.resolve()}),
  deleteContact: jest.fn((_id) => {return Promise.resolve()}),
}))


test("Renders list", async () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>)
  expect(populateContacts).toBeCalled()
  await waitFor(() => expect(screen.getByText(/abc/i)))
})

test("Renders details", async () => {
  const user = userEvent.setup()
  render(<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>)
  await waitFor(() => expect(screen.getByText(/abc/i)))
  const listItem = screen.getByText(/abc/i)
  await act(async () => {
		await user.click(listItem)
	})
  expect(screen.getByText(/age/i)).toBeInTheDocument()
})

test("Allows a contact to be edited", async () => {
  const user = userEvent.setup()
  render(<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>)

  await waitFor(() => expect(screen.getByText(/abc/i)))
  const listItem = screen.getByText(/abc/i)
  await act(async () => {
		await user.click(listItem)
	})

  await waitFor(() => expect(screen.getByRole('button', { name: /edit/i })))
  const editButton = screen.getByRole('button', { name: /edit/i })
  await act(async () => {
		await user.click(editButton)
	})

  await waitFor(() => expect(screen.getByRole('textbox', { name: /first name/i })))
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue("Abc")

  await waitFor(() => expect(screen.getByRole('button', { name: /save/i })))
  const saveButton = screen.getByRole('button', { name: /save/i })
  await act(async () => {
		await user.click(saveButton)
	})

  expect(modifyContact).toBeCalled()
})
