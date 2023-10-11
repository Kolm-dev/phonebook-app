import React, { useState } from "react"

import "./FindContact.scss"
import ky from "ky"
import { Contact } from "../ContactCreator/ContactCreator"
// type Props = {}

const FindContact = () => {
	const [showModal, setModalShow] = useState<boolean>(false)
	const [searchAttempted, setSearchAttempted] = useState<boolean>(false)
	const [query, setQuery] = useState<string>("")
	const [selectedValue, setSelectedValue] = useState<string>("phone")
	const [response, setResponse] = useState<Contact | null>(null)
	const queryInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	const findContact = async () => {
		try {
			setSearchAttempted(true)
			const url =
				selectedValue === "phone"
					? `http://localhost:3000/contacts/phone/${query}`
					: `http://localhost:3000/contacts/name/${query}`

			const res = await ky.get(url)
			const data: Contact = await res.json()

			if (data) {
				setResponse(data)
			}
		} catch (error) {
			console.error("Error finding contact:", error)
		}
	}

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		findContact()
		setResponse(null)
	}

	return (
		<>
			<div className={`modalWrapper ${showModal ? "open" : ""}`}>
				<form
					onSubmit={onSubmitHandler}
					className="form formFindContact"
				>
					<span
						onClick={() => setModalShow(!showModal)}
						className="closeModal"
					>
						X
					</span>
					<label htmlFor="queryInput">Enter a query to search: </label>
					<input
						id="queryInput"
						onChange={queryInputHandler}
						value={query}
						type="text"
						placeholder={selectedValue === "phone" ? "Phone" : "Name"}
					/>
					<div className="radioGroup">
						<label>
							<input
								type="radio"
								value="phone"
								name="contactMethod"
								checked={selectedValue === "phone"}
								onChange={e => setSelectedValue(e.target.value)}
							/>
							Phone
						</label>
						<label>
							<input
								type="radio"
								value="name"
								name="contactMethod"
								checked={selectedValue === "name"}
								onChange={e => setSelectedValue(e.target.value)}
							/>
							Name
						</label>
					</div>

					<button>Find</button>
					{(response && (
						<div className="contactFounded">
							<div>
								There`s a contact in the database:{" "}
								<p className="text">
									<u>Name</u>: {response.name}, <br /> <u>telephone</u>:{" "}
									<a
										style={{ color: "#47afdc", textDecoration: "none" }}
										href={`tel:${response.phone}`}
									>
										{response.phone}
									</a>
								</p>
							</div>
						</div>
					)) ||
						(searchAttempted && <p>Sorry, no such contact was found. Try changing the search parameter</p>)}
				</form>
			</div>
			<button
				className="findButton"
				onClick={() => setModalShow(!showModal)}
			>
				Find contact
			</button>
		</>
	)
}

export default FindContact
