import ContactCreator, { Contact } from "./ContactCreator/ContactCreator"
import FindContact from "./FindContact/FindContact"
import "./Menu.scss"
interface IMenuProps {
	addContact: (newContact: Contact) => void
}

export const Menu = ({ addContact }: IMenuProps) => {
	return (
		<div className="menu">
			<div className="menu-items">
				<ContactCreator addContact={addContact} />
				<FindContact />
			</div>
		</div>
	)
}
