import { Router } from "express"
import {
	getContacts,
	createContact,
	getContactByName,
	getContactByPhone,
	deleteContact,
	updateContact,
} from "../controllers/contactContoller"

const router = Router()

router.get("/", getContacts)
router.get("/name/:name", getContactByName)
router.get("/phone/:phone", getContactByPhone)
router.post("/", createContact)
router.delete("/delete", deleteContact)
router.put("/update", updateContact)

export default router
