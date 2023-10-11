import React, { useState } from "react"
import ky from "ky"

import "./ContactCreator.scss"
import { AddContactFunction } from "../../../App"

export interface Contact {
	name: string
	phone: string
}

export interface ContactCreatorProps {
	addContact: AddContactFunction
}

const ContactCreator = ({ addContact }: ContactCreatorProps) => {
	const [contact, setContact] = useState<Contact>({ name: "", phone: "" })
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const contactHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setContact({
			...contact,
			[name]: value,
		})
	}

	const createContact = async (contact: Contact) => {
		try {
			await ky.post("http://localhost:3000/contacts", {
				json: contact,
				headers: { "Content-Type": "application/json" },
			})

			addContact(contact)
		} catch (e) {
			console.warn("Error creating contact")
		}
	}

	const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createContact(contact)
		setModalOpen(!modalOpen)
		setContact({ name: "", phone: "" })
	}

	return (
		<>
			<div className={`modalWrapper ${modalOpen ? "open" : ""}`}>
				<form
					className="form formCreateContact"
					onSubmit={formHandler}
				>
					<span
						onClick={() => setModalOpen(!modalOpen)}
						className="closeModal"
					>
						X
					</span>

					<input
						value={contact.name}
						type="text"
						name="name"
						placeholder="Name"
						onChange={contactHandler}
					/>
					<input
						value={contact.phone}
						type="tel"
						name="phone"
						pattern="\+[0-9]{1,3}[0-9]{5,14}"
						placeholder="Phone, e.g. +123456 "
						onChange={contactHandler}
					/>
					<button style={contact.name.trim() && contact.phone.trim() ? {} : { display: "none" }}>
						Add new contact
					</button>
				</form>
			</div>
			<button
				onClick={() => setModalOpen(!modalOpen)}
				className="btnCRUD"
			>
				Create new contact
			</button>
		</>
	)
}

export default ContactCreator
