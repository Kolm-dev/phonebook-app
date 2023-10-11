import React, { useState } from "react"
import ky from "ky"
import { Contact } from "../Menu/ContactCreator/ContactCreator"

import "./UpdateForm.scss"

interface UpdatePayload {
	currentContact: Contact
	updatedData: Contact
}
type TUpdateFormProps = {
	fetchContacts: () => void
	handleCloseUpdateForm: () => void
	contactToUpdate: UpdatePayload
}

const UpdateForm: React.FC<TUpdateFormProps> = ({ fetchContacts, contactToUpdate, handleCloseUpdateForm }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const [currentContact, setCurrentContact] = useState<Contact>(contactToUpdate.currentContact)
	const currentContact = contactToUpdate.currentContact
	const [updatedData, setUpdatedData] = useState<Contact>({ ...contactToUpdate.currentContact })
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedData(prev => ({ ...prev, name: e.target.value }))
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedData(prev => ({ ...prev, phone: e.target.value }))
	}

	const updateContact = async (currentContact: Contact, updatedData: Contact) => {
		try {
			const payload: UpdatePayload = {
				currentContact: currentContact,
				updatedData: updatedData,
			}

			await ky.put("http://localhost:3000/contacts/update", {
				json: payload,
			})

			await fetchContacts()
		} catch (error) {
			alert("Error while updating contact")
		}
	}

	const updateFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		updateContact(currentContact, updatedData)
		setUpdatedData({ name: "", phone: "" })
		handleCloseUpdateForm()
	}

	return (
		<div className={`modalWrapper ${"open"}`}>
			<form
				className="form formCreateContact"
				onSubmit={updateFormHandler}
			>
				<span
					onClick={() => handleCloseUpdateForm()}
					className="closeModal"
				>
					X
				</span>
				<input
					value={updatedData.name}
					type="text"
					name="name"
					placeholder="Name"
					onChange={handleNameChange}
				/>
				<input
					value={updatedData.phone}
					type="tel"
					name="phone"
					pattern="\+[0-9]{1,3}[0-9]{5,14}"
					placeholder="Phone, e.g. +123456"
					onChange={handlePhoneChange}
				/>
				<button type="submit">Update contact!</button>
			</form>
		</div>
	)
}

export default UpdateForm
