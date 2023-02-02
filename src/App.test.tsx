import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import userEvent from '@testing-library/user-event';

const populateContacts = jest.fn(() => {return [
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

]})

test("Renders list", () => {
  render(<App />)
  expect(screen.getByText("Abc Def")).toBeInTheDocument()
})

test("Renders details", async () => {
  const user = userEvent.setup()
  render(<App />)
  const listItem = screen.getByText("Abc Def")
  await act(async () => {
		await user.click(listItem)
	})
  expect(screen.getByText(/age/i)).toBeInTheDocument()
})
