import React, { useEffect, useState, useCallback } from "react"
import ky from "ky"
import { Contact } from "../Menu/ContactCreator/ContactCreator"
import UpdateForm from "../UpdateForm/UpdateForm"

import "./ContactList.scss"

interface ContactListProps {
	contacts: Contact[]
	setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
}

const ContactList: React.FC<ContactListProps> = ({ contacts, setContacts }) => {
	const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false)
	const [contactToUpdate, setContactToUpdate] = useState<{ contact: Contact } | null>(null)

	const fetchContacts = useCallback(async () => {
		try {
			const data: Contact[] = await ky.get("http://localhost:3000/contacts").json()
			setContacts(data)
		} catch (error) {
			console.error("Error loading contacts:", error)
		}
	}, [setContacts])

	useEffect(() => {
		fetchContacts()
	}, [setContacts, fetchContacts])

	const deleteContactHandler = async (contactToDelete: { contact: Contact; index: number }) => {
		try {
			await ky.delete("http://localhost:3000/contacts/delete", {
				json: contactToDelete,
			})
			await fetchContacts()
		} catch (error) {
			console.error("Error deleting contact:", error)
		}
	}

	const handleUpdateClick = (contact: Contact) => {
		setUpdateFormOpen(true)
		setContactToUpdate({ contact })
	}

	const handleCloseUpdateForm = () => {
		setUpdateFormOpen(false)
		setContactToUpdate(null)
	}

	if (!contacts.length) {
		return (
			<div
				style={{ maxWidth: "320px", margin: "120px auto" }}
				className="contact-list"
			>
				<p>
					No contacts in the base yet. <br /> Add contact - button "Create new contact"
				</p>
			</div>
		)
	}
	return (
		<>
			{updateFormOpen && contactToUpdate && (
				<UpdateForm
					handleCloseUpdateForm={handleCloseUpdateForm}
					fetchContacts={fetchContacts}
					contactToUpdate={{
						currentContact: contactToUpdate.contact,
						updatedData: { ...contactToUpdate.contact },
					}}
				/>
			)}
			<div className="contact-list">
				{contacts.map((c, index) => (
					<div
						key={c.phone}
						className="contact-card"
					>
						<div className="label">#{index + 1}.Name:</div>
						<div className="contact-info name">{c.name}</div>

						<div className="label">Phone:</div>
						<div className="contact-info">
							<a
								href={`tel:${c.phone}`}
								className="phone"
							>
								{c.phone}
							</a>
						</div>

						<div className="controlButtons">
							<img
								className="deleteContactImage"
								src="/trash.png"
								alt="Delete"
								onClick={() => deleteContactHandler({ contact: c, index })}
							/>
							<img
								onClick={() => {
									setUpdateFormOpen(!updateFormOpen)
									handleUpdateClick(c)
								}}
								className="editContactImage"
								src="/edit.png"
								alt="Edit"
							/>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default ContactList
