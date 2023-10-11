import { Response, Request } from "express"
import * as fs from "fs"
import * as path from "path"
import { Contact } from "../types/Contact.interface"

const codeMessages = {
	200: "OK",
	201: "Created",
	204: "No Content",
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	406: "Not Acceptable",
	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
}

const contactsPath = path.resolve(__dirname, "..", "contacts.json")

const contacts = (): Contact[] => {
	try {
		if (fs.existsSync(contactsPath)) {
			const data = fs.readFileSync(contactsPath, "utf-8")
			return JSON.parse(data)
		} else {
			fs.writeFileSync(contactsPath, JSON.stringify([], null, 2), "utf-8")
			console.log("Contacts.json created!")
			return []
		}
	} catch (error) {
		console.error("Error accessing or reading contacts.json:", error)
		return []
	}
}

export const getContacts = (req: Request, res: Response) => {
	console.log("Request to get contacts")
	res.json(contacts())
}

export const getContactByName = (req: Request, res: Response) => {
	console.log("Request to retrieve a specific contact by name")

	const name: string = req.params.name
	const findContact = contacts().find((c: Contact) => c.name.toLowerCase() === name.toLowerCase())
	if (findContact) {
		res.json(findContact)
	} else {
		res.status(404).json({ message: `${codeMessages[404]}. User with "${name}" not found` })
	}
}

export const getContactByPhone = (req: Request, res: Response) => {
	console.log("Request to retrieve a specific contact by phone")

	const phone: string = req.params.phone
	console.log(phone)
	const findContact = contacts().find((c: Contact) => c.phone.trim() === phone.trim())
	if (findContact) {
		res.json(findContact)
	} else {
		res.status(404).json({ message: `${codeMessages[404]}. User with phone "${phone}" not found` })
	}
}

export const createContact = (req: Request, res: Response) => {
	console.log("Request to creating contact")

	const newContact = req.body
	console.log(`Coming new contact: ${JSON.stringify(newContact, null, 2)}`)
	fs.readFile(contactsPath, "utf8", (error: NodeJS.ErrnoException | null, data: string) => {
		if (error) {
			console.log(error)
			return res.status(500).send(`${codeMessages[500]}.Server error while reading file`)
		}

		const currentContacts = JSON.parse(data)
		currentContacts.push(newContact)

		const newContactsJSON = JSON.stringify(currentContacts, null, 2)

		fs.writeFile(contactsPath, newContactsJSON, "utf8", (err: NodeJS.ErrnoException | null) => {
			if (err) {
				console.log(err)
				return res.status(500).send(`${codeMessages[500]}.Server error while writing file`)
			}
			res.status(201).json({ newContact, message: `${codeMessages[201]}. Contact created` })
		})
	})
}

interface DeletingContactInfo {
	contact: Contact
	index: number
}

export const deleteContact = (req: Request, res: Response) => {
	console.log("Request to deleting contact")

	const { contact: deletingContact, index: deletingIndex }: DeletingContactInfo = req.body

	const filteredContacts = contacts().filter((c, index) => {
		return deletingIndex !== index && deletingContact.name !== c.name && deletingContact.phone !== c.phone
	})

	const newContactsJSON = JSON.stringify(filteredContacts, null, 2)

	fs.writeFile(contactsPath, newContactsJSON, "utf8", (err: NodeJS.ErrnoException | null) => {
		if (err) {
			console.error(err)
			return res.status(500).send(`${codeMessages[500]}. Server error while writing file`)
		}
		res.status(200).json({ message: `${codeMessages[200]}. Contact deleted` })
	})
}

interface UpdateContactInfo {
	currentContact: Contact
	updatedData: Contact
}

export const updateContact = (req: Request, res: Response) => {
	console.log("Request to update contact")

	const { currentContact, updatedData }: UpdateContactInfo = req.body
	const currentContacts = contacts()

	if (!currentContact || !updatedData) {
		return res.status(400).send("Bad Request: Missing required data.")
	}

	if (!currentContact.phone || !currentContact.name) {
		return res.status(400).send("Bad Request: Missing phone or name in currentContact.")
	}

	const contactIndex = currentContacts.findIndex(
		c => c && c.phone === currentContact.phone && c.name === currentContact.name
	)

	if (contactIndex === -1) {
		return res.status(404).send(`${codeMessages[404]}. Contact not found`)
	}

	currentContacts[contactIndex] = updatedData

	const newContactsJSON = JSON.stringify(currentContacts, null, 2)

	fs.writeFile(contactsPath, newContactsJSON, "utf8", (err: NodeJS.ErrnoException | null) => {
		if (err) {
			console.error(err)
			return res.status(500).send(`${codeMessages[500]}. Server error while writing file`)
		}
		res.status(200).json({ message: `${codeMessages[200]}. Contact updated`, updatedData })
	})
}
