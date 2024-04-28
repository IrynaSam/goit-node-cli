import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		return JSON.parse(data);
	} catch (error) {
		throw error;
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const contact = contacts.find((contact) => contact.id === contactId);
		return contact || null;
	} catch (error) {
		throw error;
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((contact) => contact.id === contactId);
		if (index !== -1) {
			const [removedContact] = contacts.splice(index, 1);
			await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
			return removedContact;
		}
		return null;
	} catch (error) {
		throw error;
	}
}

async function addContact(name, email, phone) {
	try {
		const contacts = await listContacts();
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		};
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContact;
	} catch (error) {
		throw error;
	}
}

export { listContacts, getContactById, removeContact, addContact };
