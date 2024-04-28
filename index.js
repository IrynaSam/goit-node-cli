import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} from "./contacts.js";

import { program } from "commander";
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			return console.table(await listContacts());

		case "get":
			const oneContact = await getContactById(id);
			return console.log(oneContact);

		case "add":
			if (!name || !email || !phone)
				return console.warn("\x1B[31m Missing information for adding contact!");
			console.log(await addContact(name, email, phone));
			break;

		case "remove":
			if (!id) return console.warn("\x1B[31m Missing user ID for removal!");
			console.log(await removeContact(id));
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(options).catch(console.error);
