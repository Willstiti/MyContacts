const Contact = require("../Model/Contact");

async function getAllContact(userId) {
    const contacts = await Contact.find({ user: userId });
    return contacts;
}

async function saveContact(firstName, lastName, phoneNumber, userId) {
    return await Contact.create({
                "firstName" : firstName,
                "lastName" : lastName,
                "phoneNumber" : phoneNumber,
                "user": userId,
            })
}

async function updateContact(contactId, contactData ) {
    const updated = await Contact.findByIdAndUpdate(
        contactId,
        contactData,
        { new : true}
    );

    if (!updated) throw new Error("Contact not found");

    return updated;
}

async function deleteContact(contactId ) {
    const deleted = await Contact.findByIdAndDelete(
        contactId
    );
    
    if (!deleted) throw new Error("Contact not found");
    return deleted;
}

module.exports = { getAllContact, saveContact, updateContact, deleteContact };