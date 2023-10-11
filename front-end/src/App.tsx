import React from "react"

import ContactList from "./components/ContactList/ContactList"
import { Contact } from "./components/Menu/ContactCreator/ContactCreator"
import { Menu } from "./components/Menu/Menu"

export type AddContactFunction = (newContact: Contact) => void

function App() {
	const [contacts, setContacts] = React.useState<Contact[]>([])

	const addContact = (newContact: Contact) => {
		setContacts(oldContacts => [...oldContacts, newContact])
	}

	return (
		<>
			<Menu addContact={addContact} />
			<ContactList
				contacts={contacts}
				setContacts={setContacts}
			/>
		</>
	)
}

export default App
